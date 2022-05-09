$(function(){
    var form = layui.form

    form.verify({
        psw:[/^[\S]{6,12}$/,'密码6到12位'],
        biaoji:function(value) {
            if(value ===$('[name = oldPwd]').val()){
                console.log('新旧密码不能一样');
            }
            
        },
        biaoji2:function(value){
            if(value !==$('[name = newPwd]').val()){
                console.log('两次密码不一样');
            }
            
        },
       
    })
    

    $('.layui-form').on('submit',function(e){
        console.log($(this).serialize());
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success :function(user){
                if(user.status !==0){
                    console.log('失败');
                }
                console.log('ok');
                $('.layui-form')[0].reset()
            }
        })
       
       })
      
    
})