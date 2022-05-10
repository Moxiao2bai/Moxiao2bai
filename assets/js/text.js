$(function(){
    var layer = layui.layer
    var form = layui.form
    
    leibiao()
    function leibiao(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success :function(res){
                var htmls = template('moban', res)
                $('tbody').html(htmls)
            }
        })
    }
    var indexAdd = null
    $('#jia').on('click',function(){
        
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          })
    })
      
    var indexgai = null
    $('body').on('click','.gai',function(){
        
        indexgai = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-gai').html()
          })

          var id = $(this).attr('data-id')
          $.ajax({
            type:'get',
            url:'/my/article/cates/'+id,
           success:function(res){
            if(res.status !==0){
                console.log('lose');
            }
            
            form.val('gai', res.data)
           }
            })
    })


  
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
          method: 'POST',
          url: '/my/article/addcates',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('新增分类失败！')
            }
            leibiao()
            layer.msg('新增分类成功！')
            // 根据索引，关闭对应的弹出层
            layer.close(indexAdd)
          }
        })
      })
      $('body').on('submit', '#form-gai', function(e) {
        e.preventDefault()
        $.ajax({
          method: 'POST',
          url: '/my/article/updatecate',
          data: $(this).serialize(),
          success: function(res) {
            if (res.status !== 0) {
              return layer.msg('新增分类失败！')
            }
            leibiao()
            layer.msg('新增分类成功！')
            // 根据索引，关闭对应的弹出层
            layer.close(indexgai)
          }
        })
      })
      
     
   
      

    $('body').on('click','#del',function(e){
        e.preventDefault()
        var id = $(this).attr('data-id')
       //eg1
        layer.confirm('是否分手?', {icon: 3, title:'提示'}, function(index){
        //do something
        
        
        $.ajax({
        type:'get',
        url:'/my/article/deletecate/'+id,
        success: function(res) {
            if (res.status !== 0) {
              return layer.msg('删除分类失败！')
            }
            leibiao()
            layer.msg('删除 分类成功！')
            // 根据索引，关闭对应的弹出层
            layer.close(indexgai)
          }
        })
        layer.close(index);
      });
    })  
})