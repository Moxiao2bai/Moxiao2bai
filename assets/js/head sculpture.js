 $(function(){
      // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  $image.cropper(options)

  
  $('#Upload').on('click',function(){
     
    $('#file').click()
    
    })

  $('#file').on('change',function(e){
    
    console.log('ok');
    var chushi = e.target.files
    if(chushi.length === 0){
        console.log('请上传头像');
    }



    var file = e.target.files[0]
    var newImgURL = URL.createObjectURL(file)

    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newImgURL)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

  })


  $('#yesok').on('click',function(){
      

    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')

      $.ajax({
          type:'post',
          url:"/my/update/avatar",
          data:{
            avatar: dataURL
          },
          success:function(res){
            if(res.status !==0){
                console.log('跟换失败');
            }
            console.log('ky');
            window.parent.huoqu()
          }
      })
  })

    
 })