$( document ).ready(function() {
    $(".addcart").click(function(){
        var prodid  = {pid: $(this).val()};
        //alert($(this).val());
    

        $.ajax({
            method:'POST',
            url: '/addcart',
            data: prodid,
            success: function(cart){
                console.log(cart);
            },
            error: function(){
                console.log("Error updating cart");    
            }
        });

    });

    $(".addprod").click(function(){
        var product_id = {pid: $(this).val()};
        //console.log(product_id);
        $.ajax({
            method:'POST',
            url: '/addprod',
            data: product_id,
            success: function(cart){
                console.log(cart);
                
                
            },
            error: function(){
                console.log("Error updating cart");    
            }
        });
    });

    $(".removeprod").click(function(){
        var product_id = {pid: $(this).val()};
        //console.log(product_id);
        $.ajax({
            method:'POST',
            url: '/removeprod',
            data: product_id,
            success: function(cart){
                console.log(cart);
                
                
            },
            error: function(){
                console.log("Error updating cart");    
            }
        });
    });

});
function pageRedirect() {
    window.location.href = "http://localhost:3000/usercart";
  } 