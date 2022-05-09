
$(function() {
    var form = layui.form
  
    form.verify({
      nickname: function(value) {
        if (value.length > 6) {
          return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
      }
    })
  

 tijiao()

 function tijiao(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        success:function(res){
            
            if(res.status !==0){
              return  console.log('获取失败');
            }
            // console.log(res.data);
            form.val('formUserInfo', res.data)
        }
    })
 }


 $('#btn').on('click',function(e){
    console.log(4);
    e.preventDefault()
    tijiao()
  
 })
 $('.layui-form').on('submit',function(e){
  
  e.preventDefault()
  $.ajax({
      type:'post',
      url:'/my/userinfo',
      data:$(this).serialize(),
      success :function(user){
          if(user.status !==0){
              console.log('失败');
          }
          
          window.parent.huoqu(user)
      }
  })
 
 })

})
