$(function(){
    var layer = layui.layer
    var form = layui.form
    //调用的是富文本
    initEditor()


    xiala()
    //下拉菜单的数据请求

    function xiala(){
        $.ajax({
        type:"get",
        url:'/my/article/cates',
        success:function(res){
            if(res.status !==0){
                console.log('获取失败');
            }
           var html =  template('duoxuan',res)
           $('#cate_id').html(html)
           form.render()
        }
        })
    }


    // 封面处理
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    $('#tou').on('click',function(){
        $('#ccc').click()
    })

    $('#ccc').on('change',function(e){
        var files = e.target.files
        // 判断用户是否选择了文件
        if (files.length === 0) {
          return
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
          .cropper('destroy') // 销毁旧的裁剪区域
          .attr('src', newImgURL) // 重新设置图片路径
          .cropper(options) // 重新初始化裁剪区域
      })


      //文章发布
    //   默认为发布

    var zhuangtai = '发布'
    $('#chun').on('click',function(){
        var zhuangtai = '草稿'
    })

    //表单的搜集数据及上传
    $('#laobiao').on('submit',function(e){
        e.preventDefault()
        //基于 form 表单，快速创建一个 FormData 对象
        var fd = new FormData($(this)[0])
        // 将文章的发布状态，存到 FormData 对象中
        fd.append('state',zhuangtai)

        $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function(blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob)
        // 6. 发起 ajax 数据请求
        fnn(fd)
       
      })
    })

    function fnn(fd){
        $.ajax({
            type:'post',
            url:"/my/article/add",
            data:fd,
            contentType: false,
            processData: false,
            success :function(res){
                if(res.status !==0){
                    console.log('lose');
                }
                console.log(res);
                location.href = './leibiao.html'
            }
        })
    }


})