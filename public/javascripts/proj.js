$(document).ready(function(){
  $.ajax({
		 url: "data.json",
		 dataType: "json",
		 success: function(data) {
		    $.each(data,function(index, image){
		    	$("#images").append($('<img>', {
		    		src:"images/square/"+image.path,
		    		name: image.path,
		    		alt:image.title,
		    		id:image.id,
		    		class:"sm-img"
		    	}))
		    });
		 },
		 error: function() { alert("error loading file");  }
     });
	 $("#images").on("mouseenter", "img", function(e) {
        var x = e.pageX+5;
        var y = e.pageY+5;
        var city,date;
        var titl= this.alt;
        $.ajax({
          url: "data.json",
          dataType: "json",
          async: false,
          success: function(data) {
              $.each(data, function(index, image) {
                  if(titl== this.title) {
                      city = image.city;
                      date = image.taken;
                  }
              });     
        },
        error: function() {alert("error loading file"); }
        })
       
    });
	 });
	  
 const galleryItems=document.querySelector(".gallery-items").children;
 const prev=document.querySelector(".prev");
 const next=document.querySelector(".next");
 const page=document.querySelector(".page-num");
 const maxItem=8;
 let index=1;
  
  const pagination=Math.ceil(galleryItems.length/maxItem);
  console.log(pagination)

  prev.addEventListener("click",function(){
    index--;
    check();
    showItems();
  })
  next.addEventListener("click",function(){
  	index++;
  	check();
    showItems();  
  })

  function check(){
  	 if(index==pagination){
  	 	next.classList.add("disabled");
  	 }
  	 else{
  	   next.classList.remove("disabled");	
  	 }

  	 if(index==1){
  	 	prev.classList.add("disabled");
  	 }
  	 else{
  	   prev.classList.remove("disabled");	
  	 }
  }

  function showItems() {
  	 for(let i=0;i<galleryItems.length; i++){
  	 	galleryItems[i].classList.remove("show");
  	 	galleryItems[i].classList.add("hide");


  	    if(i>=(index*maxItem)-maxItem && i<index*maxItem){
  	 	  // if i greater than and equal to (index*maxItem)-maxItem;
  		  // means  (1*8)-8=0 if index=2 then (2*8)-8=8
          galleryItems[i].classList.remove("hide");
          galleryItems[i].classList.add("show");
  	    }
  	    page.innerHTML=index;
  	 }

  	 	
  }

  window.onload=function(){
  	showItems();
  	check();
  }








