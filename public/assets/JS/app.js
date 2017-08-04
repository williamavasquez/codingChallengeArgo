$( document ).ready(function() {
    $('.UserLogin').on('click',function(){
        let key = $(this).data('key')
        window.location.href = "/login/" + key
    })

    $('.deleteBtn').on('click',function(){
        let postId = $(this).data('postid');
        
        $.ajax({
            type:'POST',
            url: "/blog/delete",
            data: {id: postId}
        });  
    });

    $('.editBtn').on('click',function(){
        let postId = $(this).data('postid');
        window.location.href = "/blog/editBlog/" + postId           
    })
}); //End of Document Ready