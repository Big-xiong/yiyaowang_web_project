require(['config'],function(){
	require(['jquery','common','car','BxCarousel'],function($,com,car){
		var $main = $('main');

		// 获取楼层信息
		$.ajax({
			url:'/api/louTimsg.php',
			dataType:'json',
			success:function(data){
				var res = data.map(function(item){
					var arr= [];
					arr = item.links.split(',');
					for(var i =8;i<=15;i++){
						var str = arr[i];
						if(str[0]=== 'i'){

							var str =`<img src="${str}" style="width:88px;height:49px">`;
							arr[i] = str;
							//console.log(arr[i]);
						}
					}
					
					return`
						<div class="firFloor clearfix">
							<div class="left">
								<h3>${item.name}</h3>
								<ul class="clearfix">
									<li><a href="">${arr[0]}</a></li>
									<li><a href="">${arr[1]}</a></li>
									<li><a href="">${arr[2]}</a></li>
									<li><a href="">${arr[3]}</a></li>
									<li><a href="">${arr[4]}</a></li>
									<li><a href="">${arr[5]}</a></li>
									<li><a href="">${arr[6]}</a></li>
									<li><a href="">${arr[7]}</a></li>
									<li><a href="">${arr[8]}</a></li>
									<li><a href="">${arr[9]}</a></li>
									<li><a href="">${arr[10]}</a></li>
									<li><a href="">${arr[11]}</a></li>
									<li><a href="">${arr[12]}</a></li>
									<li><a href="">${arr[13]}</a></li>
									<li><a href="">${arr[14]}</a></li>
									<li><a href="">${arr[15]}</a></li>
								</ul>
							</div>
							<div class="banner"></div>
							<img src="img/goods1.jpg" alt="">
							<img src="img/goods2.jpg" alt="">
							<ul>
								<li>
									<span><a href=""></a></span>
									<a href="">【保心良药】益安宁丸</a>
									<p><span>￥</span>659.0</p>
								</li>
								<li>
									<span><a href=""></a></span>
									<a href="">【保心良药】益安宁丸</a>
									<p><span>￥</span>659.0</p>
								</li>
								<li>
									<span><a href=""></a></span>
									<a href="">【保心良药】益安宁丸</a>
									<p><span>￥</span>659.0</p>
								</li>
								<li>
									<span><a href=""></a></span>
									<a href="">【保心良药】益安宁丸</a>
									<p><span>￥</span>659.0</p>
								</li>
								<li>
									<span><a href=""></a></span>
									<a href="">【保心良药】益安宁丸</a>
									<p><span>￥</span>659.0</p>
								</li>
							</ul>
						</div>
					`
				});
				$main.html(res);
				var $banner = $main.find('.banner');
				$banner.each(function(){
					$(this).BxCarousel({
						imgs:['../img/subanner1.jpg','../img/subanner2.jpg','../img/subanner3.jpg','../img/subanner4.jpg'],
						width:604,
						height:287
					});
				});
			}
		});
		var $header = $('header');
		var $mbanner = $header.find('.banner');

		// 生成大轮播图
		$mbanner.BxCarousel({
			imgs:['../img/mbanner1.jpg','../img/mbanner2.jpg','../img/mbanner3.jpg','../img/mbanner4.jpg','../img/mbanner5.jpg','../img/mbanner6.jpg'],
			width:750,
			height:400,
		});

		var $smallCar = $('.smallCar');
		var goodsList = com.getCookie('goodsList');
		goodsList = goodsList ? JSON.parse(goodsList) :[];

		// 生成送货地址
		var $top = $('#top');
		$.ajax({
			url:'../api/address.php',
			dataType:'json',
			success:function(data){
				var $ol = $('ol');
				for(var i=0;i<data.length;i++){
					var $li = $('<li/>');
					var $span = $('<span/>').text(data[i].letter);
					$li.prepend($span);
					var arr = data[i].city.split(',');
					for(var j=0;j<arr.length;j++){
						$('<a/>').text(arr[j]).appendTo($li);
					}
					$li.appendTo($ol);
				}

				$('.address').on('mouseover',function(){
					$ol.css({display:'block'});
					$('.address').css({backgroundColor:'#fff'});
					$top.find('i').css({transform:'rotate(90deg)',right: 3});
				}).on('mouseout',function(){
					$ol.css({display:'none'});
					$('.address').css({backgroundColor:'#f8f8f8'});
					$top.find('i').css({transform:'rotate(270deg)',right: 0});
				});
				$ol.on('mouseover',function(){
					$('.address').css({backgroundColor:'#fff'});
					$ol.css({display:'block'});
					$top.find('i').css({transform:'rotate(90deg)',right: 3});
				}).on('mouseout',function(){
					$ol.css({display:'none'});
					$('.address').css({backgroundColor:'#f8f8f8'});
					$top.find('i').css({transform:'rotate(270deg)',right: 0});
				});
 			}
		});

		// 我的医药网
		var $smallNav = $top.find('.smallnav');
		var $upMy = $smallNav.children('li').eq(2);
		var $my = $upMy.find('ul');
		$upMy.on('mouseover',function(){
			$my.css({display:'block'});
		});
		$my.on('mouseout',function(){
			$my.css({display:'none'});
		});

		// tab1切换
		var $tab1 = $('.tab1');
		var $title1 = $tab1.find('.title');
		var $content1 = $tab1.find('.content');
		var index;
		$title1.on('click',function(e){
			var target = e.target || e.srcElement;
			$(target).addClass('active').siblings().removeClass('active');
 			index = $(target).index();
 			$content1.children().eq(index).css({display:'block'}).siblings().css({display:'none'});
		});

		// 返回顶部
		var $sidebar = $('#sidebar');
		var $top = $sidebar.children().last();
		//console.log($top[0].randomNum(100,200));
		$top[0].onclick = function(){
			timer = setInterval(function(){com.toTop()});
		}

		car.init(-100,-402,$sidebar.children().eq(1),goodsList,$smallCar);

		// 获取商品总数
		function total(array){
			var total =0;
			for(var j=0;j<array.length;j++){
				total += array[j].qty;
			}
			$sidebar.find('i').text(total);
			$smallCar.find('i').text(total);	
		}
		total(goodsList);

		// 楼梯效果
		$.ajax({
			url:'../api/loucen.php',
			dataType:'json',
			success:function(data){
				//console.log(data);
				$('<ul/>').addClass('louTi').appendTo('body');
				$('.louTi').html(data.map(function(item){
					return`
						<li>
							<span class="num">${item.id}F</span>
							<span class="name">${item.name.slice(3)}</span>
						</li>
					`
				}));
				// 滚动效果
				$(window).on('scroll',function(){
					
					//console.log(window.scrollY);
					if(window.scrollY >= Floor(0) && window.scrollY < Floor(1)){
						floorShow(0);
					}
					else if(window.scrollY >= Floor(1) && window.scrollY < Floor(2)){
						floorShow(1);
					}
					else if(window.scrollY >= Floor(2) && window.scrollY < Floor(3)){
						floorShow(2);
					}else if(window.scrollY >= Floor(3) && window.scrollY < Floor(4)){
						floorShow(3);
					}else if(window.scrollY >= Floor(4) && window.scrollY < Floor(5)){
						floorShow(4);
					}else if(window.scrollY >= Floor(5) && window.scrollY < Floor(6)){
						floorShow(5);
					}else if(window.scrollY >= Floor(6) && window.scrollY < Floor(7)){
						floorShow(6);
					}else if(window.scrollY >= Floor(7) && window.scrollY < Floor(8)){
						floorShow(7);
					}else if(window.scrollY >= Floor(8)){
						floorShow(8);
					}
				});
				// 点击效果
				$('.louTi').on('click','li',function(){
					var index = $(this).index();
					$('body').animate({scrollTop:Floor(index)});
				});
			}
		});

		// 计算每个楼层距离父元素的高度
		function Floor(i){
			return $('main').children('.firFloor').eq(i).offset().top-200;	
		}
		//显示当前楼层信息
		function floorShow(i){
			$('.louTi').children().eq(i).children('.num').css('display','none');
			$('.louTi').children().eq(i).children('.name').css('display','block');
			$('.louTi').children().eq(i).siblings().children('.num').css('display','block');
			$('.louTi').children().eq(i).siblings().children('.name').css('display','none');
		}
	});
});