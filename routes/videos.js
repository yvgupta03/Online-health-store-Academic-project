var express = require('express');
var router = express.Router();
var monk = require('monk');

//server name-localhost port number-27017 dbname-vidzy ==>> server:portnumber/dbname
var db = monk('localhost:27017/Vidzy'); // IMPORTANT Dtabase name is case sensitive
var collection = db.get('videos');

//Retrieving all videos
// here '/' is 'api/videos' since app.use routes to this file called videos.js
router.get('/', function(req, res) {
    
    // for below find ==>> {} is query parameter, empty means no criteria for selection, therefore selecting all
    // also function used below is a callback function with 1st parameter as error object 
    //and 2nd (videos) as returned array result object for success
    collection.find({}, function(err, videos){
        //console.log(videos);
        if(err) throw err;
        res.json(videos);
    });

    //res.render('index', { title: 'Express' });
});

//Retrieving specific video based on _id
// here '/' is 'api/videos' since app.use routes to this file called videos.js
router.get('/:id', function(req, res) {
    // here the :id is used as parameter from url and _id is a primary key
    collection.findOne({_id: req.params.id}, function(err, video){ //using convention of singular video since only one record searched
        //console.log(videos);
        if(err) throw err;
        res.json(video);
    });

});

//Creating new video - inserting
// here '/' is 'api/videos' since app.use routes to this file called videos.js
router.post('/', function(req, res) {
    collection.insert({
        title: req.body.title,
        genre: req.body.genre,  //encoded body key:values pairs fired from POSTMAN
        description: req.body.desc 
    }, function(err, video){ //using convention of singular video since only one record inserted
        //if insert is successful, return new video as a response
        if(err) throw err;
        res.json(video);
    });

});

//Updating an existing video
// here '/' is 'api/videos' since app.use routes to this file called videos.js
router.put('/:id', function(req, res) {
    // here the :id is used as parameter from url and _id is a primary key
    collection.update({_id: req.params.id}, //searches object to be updates
    {
        $set: {                     // sets or updates selected objects and update happens on mentioned properties
            title: req.body.title,  
            genre: req.body.genre,  //encoded body key:values pairs fired from POSTMAN
            description: req.body.desc  // So if desc is not not to be updated, remove it from here
        }
    }, function(err, video){ //using convention of singular video since only one record searched
        
        if(err) throw err;
        res.json(video);
    });

});


//Deletion of specific video based on _id
// here '/' is 'api/videos' since app.use routes to this file called videos.js
router.delete('/:id', function(req, res) {
    // here the :id is used as parameter from url and _id is a primary key
    collection.remove({_id: req.params.id}, function(err, video){ //using convention of singular video since only one record searched
        if(err) throw err;
        res.json(video);
    });

});

module.exports = router;
