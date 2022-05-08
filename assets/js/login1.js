$(function () {
  $('#link_reg').click(function () {
    $('.reg-box').show()
    $('.login-box').hide()
  })
  $('#link_login').click(function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })
  // 校验
  // layui.use(['form', 'layer'], function () {

  var form = layui.form;
  var layer = layui.layer
  form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })
  // })
  // 注册
  $('#form_reg').on('submit', function (e) {
   
    e.preventDefault()
    

    $.ajax({
      type: "POST",
      url: '/api/reguser',
      data: {
        username: $('#form_reg [name=username]').val(),
      password: $('#form_reg [name=password]').val()
      },
      
      success: function (response) {
        if(response.status !==0){
         return layer.msg('shibai');
        }
        layer.msg('注册成功，请登录！')
        $('#link_login').click()
      }
    });
  })

  // 登录
  $('#form_login').on('submit', function (e) {
    e.preventDefault()
    
    $.ajax({
      type:'post',
      url: '/api/login',
      data:$(this).serialize(),
      success: function(tgg){
        if(tgg.status  !==0){
          return layer.msg('shibai');
        }
        layer.msg('登陆成功！')
        localStorage.setItem('token', tgg.token)
        location.href="./demo.html"
      }
    })

  })
})

