var express = require('express');
var router = express.Router();

var monk = require('monk');
//server name-localhost port number-27017 dbname-vidzy ==>> server:portnumber/dbname
var db = monk('localhost:27017/Vidzy'); // IMPORTANT Dtabase name is case sensitive
var collection = db.get('products');
var customers = db.get('customers');
var orders = db.get('orders');
var carts = db.get('carts');
var passport = require('passport');
var Account = require('../models/account');
var globalUser;
var globalAdmin;


/* GET home page. */
router.get('/', function(req, res, next) {  
  res.redirect('/medhome');
});


router.get('/medhome', function(req, res) {  
  
  setGlobals(req.session.passport); 
   
  collection.find({deleted : false}, function(err, products){
      if(err) throw err;
      //console.log(req);
      var arr1=[];
      var arr2=[];
           
      console.log(req.query);
      products.forEach(element => {
        if(req.query.searchtitle!='' && req.query.searchtitle!=undefined)
        {
          var attr = element.pname.trim();
          var searchValue = req.query.searchtitle.trim();
          if((attr.toLowerCase()).includes(searchValue.toLowerCase()))
          {
            arr1.push(element);
          }
        }
        else{
          arr1.push(element);
        }
      });
      //console.log("Arr1==>"+arr1);
      
      if(req.query.Tablet==undefined && req.query.Capsule==undefined && req.query.Syrup==undefined && req.query.Injection==undefined && req.query.Ointment==undefined && req.query.Cream==undefined && req.query.Gel==undefined && req.query.Powder==undefined && req.query.Suspension==undefined && req.query.Solution==undefined && req.query.Soap==undefined)
      {
        arr2=arr1;
      }
      else
      {
        for (let i = 0; i < arr1.length; i++) 
          {
          var tablet = req.query.Tablet;
          var capsule = req.query.Capsule;
          var syrup = req.query.Syrup;
          var injection = req.query.Injection;
          var ointment = req.query.Ointment;
          var cream = req.query.Cream;
          var gel = req.query.Gel;
          var powder = req.query.Powder;
          var suspension = req.query.Suspension;
          var solution = req.query.Solution;
          var soap = req.query.Soap;
          if(tablet!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(tablet.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(capsule!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(capsule.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(syrup!=undefined)
          {
            console.log(arr1[i]);
            if(arr1[i].ptype.toLowerCase().includes(syrup.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(injection!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(injection.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(ointment!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(ointment.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(cream!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(cream.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(gel!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(gel.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(powder!=undefined)
          {
            console.log(arr1[i]);
            if(arr1[i].ptype.toLowerCase().includes(powder.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(suspension!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(suspension.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(solution!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(solution.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
          if(soap!=undefined)
          {
            if(arr1[i].ptype.toLowerCase().includes(soap.toLowerCase()))
            {
              arr2.push(arr1[i]);
              continue;
            }            
          }
        }
      }
      
      res.render('index2', {results: arr2, user : req.user, administrator : globalAdmin});
  });

});

function setGlobals(user)
{
  customers.findOne(user, function(err, cus){
    if(err) throw err;
    globalAdmin = cus.admin;
    globalUser = cus.user;
    //console.log('Admin ==> '+globalAdmin+' globalUser ==> '+globalUser);
  });
}




router.get('/register', function(req, res) {
  res.render('register', {errorlog : false});
});

router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) {
          return res.render('register', { account : account, errorlog : true });
      }

      passport.authenticate('local')(req, res, function () {
        //console.log(req.body);
        var isAdmin = false;
        if(req.body.admin == 'Crxyxyz')
        {
          isAdmin = true;
        }
        customers.insert({
            user: req.body.username,
            fname: req.body.firstname,
            lname: req.body.lastname,
            dob: req.body.birthdate,
            phone: req.body.phone,
            address: req.body.address,
            admin: isAdmin

        }, function(err, cust){ //using convention of singular account since only one record inserted
            //if insert is successful, return all videos at home index page by redirecting
            if(err) throw err;        
            res.redirect('/');
        }); 
      });
  });
});

router.get('/login', function(req, res) {
  res.render('login', {errorlog : false});
});

router.get('/login-error', function(req, res) {
  res.render('login', {errorlog : true});
});

router.post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login-error' }));
router.post('/login-error', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login-error' }));

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});



//inserts new record and comes back to index page
router.post('/medhome', function(req, res) {
  if(req.user)
  {
    collection.insert({
      pname: req.body.pname,
      ptype: req.body.ptype,  //encoded body key:values pairs fired from POSTMAN
      ptag: req.body.ptag,
      pbrand: req.body.pbrand,
      pcomposition: req.body.pcomposition,
      pquantity: req.body.pquantity,
      psymptoms: req.body.psymptoms,
      pdesc: req.body.pdesc,
      price: req.body.price,
      deleted: false
  }, function(err, product){ //using convention of singular video since only one record inserted
      //if insert is successful, return all videos at home index page by redirecting
      if(err) throw err;        
      res.redirect('/medhome');
  }); 
  }
  else{
    res.render('error');
  }
   
});

//IMPORTANT - Define parameterized url routing after all non-parameterized sibling routes
// Example - Define /videos/:id routing after /videos/new otherwise ejs gets confused
router.get('/product/new', function(req, res, next) {
  //console.log(req.user);
  if(req.user)
  {
    res.render('new');
  }
  else{
    res.render('error');
  }
  
});

//Deletion and back to home index page
// router.delete('/products/:id', function(req, res) {
//   // here the :id is used as parameter from url and _id is a primary key
//   collection.remove({_id: req.params.id}, function(err, product){ //using convention of singular video since only one record searched
//       if(err) throw err;
//       res.redirect('/medhome');
//   });

// });

//SOFT DELETE
router.post('/products/:id', function(req, res) {
  // here the :id is used as parameter from url and _id is a primary key
  if(req.user)
  {
    collection.update({_id: req.params.id}, //searches object to be updates
      {
          $set: {
            deleted: true
        }
      }, function(err, product){ //using convention of singular video since only one record searched
          if(err) throw err;
          res.redirect('/medhome');
      });
  }
  else{
    res.render('error');
  }

});


//to show individual video details on click based on id
router.get('/products/:id', function(req, res) {
  if(req.user)
  {
    collection.findOne({_id: req.params.id}, function(err, product){
      if(err) throw err;
      res.render('show', {product: product, administrator : globalAdmin}); //video document with its attributes - foreach loop in show.ejs file
    });
  }
  else{
    res.render('error');
  }

});

//Updating an existing video
router.put('/products/:id', function(req, res) {
  // here the :id is used as parameter from url and _id is a primary key
  collection.update({_id: req.params.id}, //searches object to be updates
  {
      $set: {
        pname: req.body.pname,
        ptype: req.body.ptype,  //encoded body key:values pairs fired from POSTMAN
        ptag: req.body.ptag,
        pbrand: req.body.pbrand,
        pcomposition: req.body.pcomposition,
        pquantity: req.body.pquantity,
        psymptoms: req.body.psymptoms,
        pdesc: req.body.pdesc,
        price: req.body.price
    }
  }, function(err, product){ //using convention of singular video since only one record searched
      if(err) throw err;
      res.redirect('/medhome');
  });

});

//opens edit form
router.get('/products/:id/edit', function(req, res, next) {
  if(globalAdmin && req.user)
  {
    //find video by id then use it to pre-fill fields in edit form of video so that user can make changes
    collection.findOne({_id: req.params.id}, function(err, product){
      if(err) throw err;
      //console.log(video);
      res.render('edit2', {editableProd: product, product_id: req.params.id});
  });
  }
  else{
    res.render('error');
  }
  
});

router.post('/addprod', function(req, res) {
  if(req.user)
  {
    carts.findOne({_id: req.body.pid}, function(err, cart){
      if(err) throw err;
      var qty;
      for (const property in cart) {
        //console.log(`${property}: ${cart[property]}`);
        if(property == 'pquantity')
        {
          qty = cart[property];
        }
      }

      carts.update({_id: req.body.pid}, //searches object to be updates
      {
          $set: {
            pquantity: qty+1
        }
      }, function(err, cart){ //using convention of singular video since only one record searched
          if(err) throw err;
      });

  });
  }
  else{
    res.render('error');
  }
});

router.post('/removeprod', function(req, res) {
  if(req.user)
  {
    carts.findOne({_id: req.body.pid}, function(err, cart){
      if(err) throw err;
      var qty;
      for (const property in cart) {
        //console.log(`${property}: ${cart[property]}`);
        if(property == 'pquantity')
        {
          qty = cart[property];
        }
      }
      qty=qty-1;
      if(qty>0)
      {
        carts.update({_id: req.body.pid}, //searches object to be updates
        {
            $set: {
              pquantity: qty
          }
        }, function(err, cart){ //using convention of singular video since only one record searched
            if(err) throw err;
        });
      }
      else{
        carts.remove({user : globalUser, _id: req.body.pid}, function(err, product){
          if(err) throw err;
        });
      }
      

  });
  }
  else{
    res.render('error');
  }
});

router.post('/addcart', function(req, res) {
  if(req.user)
  {
    
    carts.findOne({user : globalUser, pid : req.body.pid}, function(err, cart){
      var qty;
      for (const property in cart) {
        //console.log(`${property}: ${cart[property]}`);
        if(property == 'pquantity')
        {
          qty = cart[property];
        }
      }
      //console.log('qty extracted ==>'+qty);
      if(cart == null || cart == undefined)
      {
        carts.insert({
            user : globalUser,
            pid: req.body.pid,
            pquantity: 1      
        }, function(err, c){ //using convention of singular video since only one record inserted
            //if insert is successful, return all videos at home index page by redirecting
            if(err) throw err;
        });
      }
      else{
        carts.update({user : globalUser, pid : req.body.pid}, //searches object to be updates
        {
            $set: {
              pquantity: qty+1
          }
        }, function(err, cart){ //using convention of singular video since only one record searched
            if(err) throw err;
        });
      }

    });

  }
  else{
    res.render('error');
  }
   
});

router.get('/usercart', function(req, res) {
  if(req.user)
  {
    var prods = [];
    var name;
    var type;
    var quants;
    var price;
    var cartid;
    var gtotal =0;
    var i = 0;
    var j = 0;
    carts.find({user : globalUser}, function(err, carts){
      if(err) throw err;
      //console.log(carts);
      for (const cart in carts)
      {
          i++;
      }
      if(i==0)
      {
        res.redirect('/');
      }
      for (const cart in carts) {       
        
        collection.findOne({_id: carts[cart]['pid']}, function(err, product){
          if(err) throw err;

          j++;
          for (const property in product) {
            //console.log(`${property}: ${cart[property]}`);
            if(property == 'pname')
            {
              name = product[property];
              //console.log(name);
            }
            if(property == 'ptype')
            {
              type = product[property];
              //console.log(type);
            }
            if(property == 'price')
            {
              price = product[property];
              //console.log(price);
            }            
          }
          quants = carts[cart]['pquantity'];
          cartid = carts[cart]['_id'];
          //console.log(quants);
          var obj = {'pname' : name, 'ptype' : type, 'pquantity' : quants, 'price' : price, 'cartid' : cartid};
          //console.log(obj);
          prods.push(obj);
          gtotal = gtotal + (price*quants);
          //console.log(prods);
          if(i==j)
          {
            //console.log(prods);
            customers.findOne({user: globalUser}, function(err, cust){
              res.render('cart', {results : prods, cust : cust, grandtotal : gtotal});
            });            
          }          
        });      
        
      }       
      
    });
  }
  else{
    res.render('error');
  }
});

router.post('/ordered', function(req, res) {
  if(req.user)
  {
    var email = req.body.username;
    var phone = req.body.phone;
    var address = req.body.address;
    var pname;
    var gtotal = 0;
    var tdate;
    var quants;
    var i = 0;
    var j = 0;
    var prodarr = [];
    tdate = new Date();
    var dd = String(tdate.getDate()).padStart(2, '0');
    var mm = String(tdate.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = tdate.getFullYear();
    tdate = mm + '/' + dd + '/' + yyyy;
    carts.find({user : globalUser}, function(err, c){
      if(err) throw err;
      
      for (const cart in c)
      {
          i++;
      }
      for (const cart in c) {
        
        collection.findOne({_id: c[cart]['pid']}, function(err, product){
          if(err) throw err;
          j++;
          for (const property in product) {
            //console.log(`${property}: ${cart[property]}`);
            if(property == 'pname')
            {
              pname = product[property];
              prodarr.push(pname);
              //console.log(name);
            }
            if(property == 'price')
            {
              price = product[property];
              //console.log(price);
            }      
          }
          quants = c[cart]['pquantity'];
          gtotal = gtotal + (price*quants);         

          if(i==j)
          {
            var prodlist = prodarr.join(', ');
            orders.insert({
              user: globalUser,
              email: email,
              phone:phone,
              address:address,
              gtotal:gtotal,
              date:tdate,
              pname:prodlist

          }, function(err, order){
            carts.remove({user: globalUser}, function(err, product){
              if(err) throw err;
            });              
            res.redirect('/history');
          }); 
          }

        });
      }
      
    });
  }
  else{
    res.render('error');
  }
});

router.get('/history', function(req, res) {
  if(req.user)
  {
    orders.find({user: globalUser}, function(err, orders){
      if(err) throw err;
      res.render('orders', {results : orders});
    });
  }
  else{
    res.render('error');
  }
    

});

module.exports = router;
