$(function(){

    $.ajax({
        method:'GET',
        url: 'api/videos',
        success: function(videos){
            
            $.each(videos, function(i, video){
                //$("#videolist").append('<li style="list-style-type:none; float:left; padding: 16px"><img src="../images/'+video.image+'" style="width: 200px; height: 200px"><br>'+video.title+'</li>');
                $("#videolist").append('<li>'+video.title+'</li>');
            });
        },
        error: function(){
            alert("Error loading videos");
        }

    });


    // #add is submit button for form element in main.html for insert operation
    $("#add").click(function(){
        console.log("Clicked !!!");
        //retrieve values to be inserted from form-input fields and use them to build a new video object that can be inserted into mongodb
        var vtitle  = $("#title").val();
        var vgenre  = $("#genre").val();
        var vdesc  = $("#desc").val();
        
        //should have same key names as defined in api file like desc as desc and not description
        var video = {
            title:vtitle,
            genre:vgenre,
            desc:vdesc
        }


        //include data field in ajax call whenever sending a body data with request as shown below
        $.ajax({
            method:'POST',
            url: 'api/videos',
            data: video,
            success: function(newVideo){
                $("#videolist").append('<li>'+newVideo.title+'</li>');
            },
            error: function(){
                alert("Error loading videos");    
            }
        });

    });


});