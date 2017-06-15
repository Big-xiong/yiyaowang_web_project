require(['config'],function(){
	require(['jquery','common'],function($,com){
		var $phone = $('.phone');
		var $psw = $('.psw');
		var $log = $('.log');

		$log.on('click',function(){
			/*var phone = $('.phone').val();
			var psw  = $('.psw').val();*/
			//console.log($('.phone').val());
			$.ajax({
				url:'../api/login.php',
				data:{
					phone:$('.phone').val(),
					password:$('.psw').val()
				},
				success:function(res){
					//JSON.parse(res);
					if(res == 'ok'){
						location.href = '../index.html';
						alert('登录成功');
					}else{
						alert('用户名或密码错误');
					}
				}
			});
			return false;
		});
	});
});
