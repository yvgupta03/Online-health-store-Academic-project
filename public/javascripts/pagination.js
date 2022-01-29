window.onload = function(){
    console.log("Entered paginaton   " + size);
    var buttons = document.getElementsByClassName("paging");
    console.log(buttons);
    for (element of buttons) {
        
        element.addEventListener('click', function (e) {
            pageChange(this.value);
            //console.log("added - "+ this.value);
          });
    }
}
function pageChange(pgno){
    console.log(pgno);

    $('#resList').empty();

    $('#resList').append(`
    <% for(let i = 0; i < pagesize; i++){%>
        <div class="sm-col-3">
            <img src="images/<%= results[i].image %>" style="width:200px; height:200px;" class="img-thumbnail"/>
            <div class="caption d-flex justify-content-center"><a href="videos/<%= results[i]._id %>"><%= results[i].title %></a></div>
        </div>    
    <% } %>
    `);


    
    
}