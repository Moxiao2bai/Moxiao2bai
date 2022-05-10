$(function(){
    var form = layui.form

    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 10, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '' // 文章的发布状态
      }



     fenlei()
     leige()
    function fenlei(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            data: q,
            success:function(res){
                if(res.status !==0){
                    console.log(lose);
                }
              var html =  template('xiakai',res)
              $('[name="cate_id"]').html(html)
                form.render()
            }
        })
    }

   
    function leige(){
        $.ajax({
            type:'get',
            url:'/my/article/list',
            data: q,
            success:function(res){
                if(res.status !==0){
                    console.log(lose);
                }
              var html =  template('yema',res)
              $('tbody').html(html)
                form.render()
            }
        })
    }


    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
      
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
      
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
      
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

      $('#form-search').on('submit',function(e){
          e.preventDefault()
            var cate_id =$('[name="cate_id"]').val()
            var state =$('[name="state"]').val()

            q.cate_id = cate_id
            q.state = state
          leige()
      })


      $('table').on('click','#del',function(e){
          console.log(1);
        e.preventDefault()
        var id = $('#del').attr('data-Id')
        console.log(id);
       //eg1
    
        $.ajax({
        type:'get',
        url:'/my/article/delete/'+id,
        success: function(res) {
            if (res.status !== 0) {
              return layer.msg('删除分类失败！')
            }
            leige()
            layer.msg('删除 分类成功！')
            // 根据索引，关闭对应的弹出层
           
          }
        })
    })  

})