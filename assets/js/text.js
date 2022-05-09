$(function(){
    var layer = layui.layer

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

    $('#del').on('click',function(){
        $.ajax({
        type:'get',
        url:'/my/article/deletecate/:id',
        success:function(res){
           
        }
        })
    })  
})