require(['config'],function(){
	require(['jquery','common'],function($,com){
		var $phone = $('.phone');
		var $psw = $('.psw');
		var $rewrite = $('.rewrite');
		var $form = $('form');

		// 手机状态
		$phone.after($('<span/>').addClass('pswicon3'));
		$phone.on('blur',function(){
			//console.log(666);
			var phone = $('.phone').val();
			if(phone == ''){
				$phone.after($('<i/>').text('不能为空'));
				$('.pswicon3').css({display:'none'});

				return false;

			}else if(!/^1[3-57-9]\d{9}$/.test(phone)){
				$phone.after($('<p/>').text('手机号格式不正确').addClass('p1'));
				$('.pswicon3').css({display:'none'});

				return false;
			}
			$('.pswicon3').css({display:'block'});
		}).on('focus',function(){
			$('i').remove();
			$('.p1').remove();
		});
		
		// 密码状态
		$psw.after($('<span/>').addClass('pswicon1'));
		$psw.on('blur',function(){
			var psw  = $('.psw').val();
			$('.safe').remove();
			$('.p3').remove();
			if(psw == ''){
				$psw.after($('<p/>').text('密码不能为空').addClass('p2'));
				$rewrite.attr('disabled','disabled');

				return false;
			}
			if(psw.length<6){
				$psw.after($('<p/>').text('密码只能为6-20位字符').addClass('p2'));
				$rewrite.attr('disabled','disabled');

				return false;
			}
			if(/^\d{6,20}$/.test(psw)){
				$psw.after($('<p/>').text('密码不能全为数字').addClass('p2'));
				$rewrite.attr('disabled','disabled');

				return false;
			}
			if(/^[a-z]{6,20}$/g.test(psw)){
				$psw.after($('<p/>').text('密码不能全为字母，请包含至少1个数字或符号 ').addClass('p2'));
				$rewrite.attr('disabled','disabled');

				return false;
			}
			if(/^[\x21-\x7E]{6,20}$/g.test(psw)){
				$('.pswicon1').css({display:'block'});
				$rewrite.attr('disabled',false);
			}
		}).on('focus',function(){
			$('.p2').remove();
			$('.pswicon1').css({display:'none'});
			$psw.after($('<p/>').text('6-20位字符，建议由字母，数字和符号两种以上组合').css({color:'#ddd'}).addClass('p3'));

			var $div = $('<div/>').addClass('safe').css({display:'none'});
			$rewrite.after($div);
			$('<span/>').text('安全程度').appendTo($div).addClass('p4');
			$('<span/>').text('弱').addClass('weak').appendTo($div);
			$('<span/>').text('中').addClass('mid').appendTo($div);
			$('<span/>').text('强').addClass('strong').appendTo($div);
			
			// keydown的时候字符还没出来，改用keyup
			$(window).on('keyup',function(){
				$('.p3').remove();
				var psw  = $('.psw').val();
				if(psw == ''){
					$('.safe').css({display:'none'});
					$rewrite.attr('disabled','disabled');

					return false;	
				}
				if(/^[a-z]{1,20}$/g.test(psw)){
					$('.weak').css({backgroundColor:'#f00'});
					$('.mid').css({backgroundColor:'#5e5e5e'});
					$('.safe').css({display:'block'});
					$rewrite.attr('disabled','disabled');

					return false;
				}
				if(/^\d{1,20}$/.test(psw)){
					$('.weak').css({backgroundColor:'#f00'});
					$('.mid').css({backgroundColor:'#5e5e5e'});
					$('.safe').css({display:'block'});
					$rewrite.attr('disabled','disabled');

					return false;
				}
				if(/^[\x21-\x7E]{6,20}$/g.test(psw)){
					$('.weak').css({backgroundColor:'#f00'});
					$('.mid').css({backgroundColor:'#f00'});
					$('.safe').css({display:'block'});
					$rewrite.attr('disabled',false);
				}
			});
		});

		// 确认密码
		$rewrite.after($('<span/>').addClass('pswicon2'));
		$rewrite.on('focus',function(){
			$('.pswicon2').css({display:'none'});
			$('.p6').remove();
			$('.p7').remove();
			$rewrite.after($('<p/>').text('请再次输入登录密码').addClass('p5'));
			var psw  = $('.psw').val();
		}).on('blur',function(){
			$('.p5').remove();
			var psw  = $('.psw').val();
			var rewrite = $('.rewrite').val();
			if(rewrite == ''){
				$rewrite.after($('<p/>').text('确认密码不能为空').addClass('p6'));

				return false;	
			}
			if(rewrite != psw){
				$rewrite.after($('<p/>').text('两次密码输入不一致').addClass('p7'));

				return false;
			}
			
			if(rewrite == psw){
				$('.pswicon2').css({display:'block'});
			}
		});

		// 勾选阅读我
		$('#read').after($('<p/>').text('请勾选1药网服务协议').addClass('p8'));
		$('#read').on('click',function(){
			if(!$('#read').is(':checked')){
				$('.p8').css({display:'block'});
			}else{
				$('.p8').css({display:'none'});
			}	
		});

		// 点击注册按钮
		var $regBtn = $('.reg');
		$regBtn.on('click',function(){
			if( $('.pswicon1').css('display') == 'block' && $('.pswicon2').css('display') == 'block' && $('.pswicon3').css('display') == 'block' && $('#read').is(':checked')){
				$.ajax({
					url:'../api/reg.php',
					data:{
						phone:$('.phone').val(),
						password:$('.psw').val()
					},
					success:function(res){
						console.log(res);
						if(res === 'ok'){
							alert('恭喜您注册成功');	
						}else if(res === 'no'){
							alert('该手机号已被注册');
						}
					}
				});
			}else{
				alert('请完善您的信息');
			}

			return false;
		});
	});
});