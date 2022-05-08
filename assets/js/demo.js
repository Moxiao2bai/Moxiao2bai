
$(function(){
  
    huoqu()
    var layer = layui.layer
  
  $('#btnLogout').on('click', function () {
    //   console.log(1);
    //   layer.confirm('此操作将退出登录, 是否继续?', { icon: 3, title: '提示' }, function(index) {
    //     //do something
    //     localStorage.removeItem('token')
    //     location.href = 'index.html'
    //     layer.close(index);
    // });
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
      
      
      localStorage.removeItem('token')
     
      location.href = 'index.html'

      
      layer.close(index)
    })
  })
})





function huoqu(){
    console.log(3);
    
    $.ajax({
        type:"get",
        url:'/my/userinfo',
        
        success:function(res){
            console.log(1);
            if(res.status !==0){
                return layui.layer.msg('获取用户信息失败！')
            }
            console.log(1);
            xuanran(res.data)
        }
    })
}


//渲染头像
function xuanran(user){
    
    var name = user.nickname || user.username
    console.log(name);
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎狗蛋')
    // 3. 按需渲染用户的头像
    if(user.user_pic !==null){
        $('.layui-nav-img')
      .attr('src', user.user_pic)
      .show()
      $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
    
}