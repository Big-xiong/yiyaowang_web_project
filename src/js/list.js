require(['config'],function(){
	require(['jquery','common','car','lazyload'],function($,com,car){
		// 生成送货地址
		var $top = $('#top');
		var $ol = $('ol');
		var date = new Date();
		$.ajax({
			url:'../api/address.php',
			dataType:'json',
			success:function(data){
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
					show();
				}).on('mouseout',function(){
					hide();
				});
				$ol.on('mouseover',function(){
					show();
				}).on('mouseout',function(){
					hide();
				});
 			}
		});
		function show(){
			$ol.css({display:'block'});
			$('.address').css({backgroundColor:'#fff'});
			$top.find('i').css({transform:'rotate(90deg)',right: 3});
		}
		function hide(){
			$ol.css({display:'none'});
			$('.address').css({backgroundColor:'#f8f8f8'});
			$top.find('i').css({transform:'rotate(270deg)',right: 0});
		}

		// 利用cookies生成购物车商品信息
		var $smallCar = $('.smallCar');
		var goodsList = com.getCookie('goodsList');
		goodsList = goodsList ? JSON.parse(goodsList) :[];

		// 生成商品列表
		var $goodslist = $('.goodslist');
		$.ajax({
			url:'../api/goodslist.php',
			dataType:'json',
			success:function(data){
				console.log(data);
				for(var i =0 ;i<data.length;i++){
					if(data[i].comment === null){
						var $li = $('<li/>').data('id',data[i].id);
						var $img = $('<img class="lazy" width="200" height="200">').attr('data-original','../'+data[i].imgurl);
						$('<a/>').append($img).appendTo($li).attr({href:'../html/detail.html?id='+data[i].id});
						$('<p/>').text('￥'+data[i].price).addClass('price').appendTo($li);
						$('<p/>').text(data[i].title).addClass('title').appendTo($li);
						$('<button/>').text('添加购物车').appendTo($li);
					}else{
						var $li = $('<li/>').data('id',data[i].id);
						var $img = $('<img class="lazy" width="200" height="200">').attr('data-original','../'+data[i].imgurl);
						$('<a/>').append($img).appendTo($li).attr({href:'../html/detail.html?id='+data[i].id});
						$('<p/>').text('￥'+data[i].price).addClass('price').appendTo($li);
						$('<p/>').text(data[i].title).addClass('title').appendTo($li);
						$('<span/>').text('评论:'+data[i].comment).appendTo($li);
						$('<button/>').text('添加购物车').appendTo($li);
					}
					$goodslist.append($li);
				}
				$('img.lazy').lazyload({
					effect:'fadeIn',
					threshold :300
				});
				$goodslist.on('click','button',function(){
					var $currli = $(this).parent();
					var currId = $currli.data('id');

					// 查看商品是否已经存在
					for(var i = 0;i<goodsList.length;i++){
						if(goodsList[i].id === currId ){
							goodsList[i].qty ++ ;
							break;
						}
					}
					if(i === goodsList.length){
						var goods = {
							id:currId,
							imgurl:$currli.find('img').attr('src'),
							title:$currli.children('.title').text(),
							price:$currli.children('.price').text().slice(1)*1,
							qty:1,
						}
						goodsList.push(goods);
					}
					com.setCookie('goodsList',JSON.stringify(goodsList),date,'/');
					total(goodsList);
					
					return false;
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

		// 返回顶部
		var $sidebar = $('#sidebar');
		var $top = $sidebar.children().last();
		//console.log($top[0].randomNum(100,200));
		$top[0].onclick = function(){
			timer = setInterval(function(){com.toTop()});
		}

		// 面向对象创建购物车列表

		/*function CarList(top,left,ele,msg){
			this.top = top;
			this.left = left;
			this.width = 400;
			this.height = 240;
			this.ele = ele;
			this.msg = msg;
			this.init(); 
		}

		CarList.prototype ={
			init:function(){
				var $carList = $('<ul/>').css({width:this.width,height:this.height,border:'1px solid #f00',position:'absolute',top:this.top,left:this.left,display:'none',backgroundColor:'#fff',overflow:'auto'});
				var arr = this.msg;
				var currP = this.ele;
				var p = this.ele.parent();
				var $total;
				var $totalPrice;
				//console.log(p);
				$carList.appendTo(p);

				currP.on('mouseover',function(){
					//console.log(4);
					// 生成cookie中的商品信息
					$carList.html(arr.map(function(item){
							return `
								<li class="clearfix" data-id="${item.id}">
									<img src="${item.imgurl}" style="width:40px;height:40px">
									<p class="title">${item.title}</p>
									<p class="price">${item.price}</p>
									<button class="addGoods">+</button>
									<input type="text" value="${item.qty}">
									<button class="subGoods">-</button>
								</li>

							`;
						}
					));

					// 生成底部总数和总价信息
					var $li = $('<li/>').addClass('bottom').css({position:'fixed',bottom:17,right:89,height:30,width:390,backgroundColor:'#f7f7f7'});
					var total = 0;
					var totalPrice = 0;
					for(var i=0;i<arr.length;i++){
						total+= arr[i].qty;
						var str = arr[i].price;
						var pricNum = str.slice(1)*1;
						totalPrice += pricNum*arr[i].qty;
					}
					$total = $('<p/>').html('共<span style="color:#f00">'+total+'</span>件商品').addClass('total').appendTo($li);
					$totalPrice = $('<p/>').html('合计:<span style="color:#f00">'+totalPrice.toFixed(2)+'<span/>').addClass('totalPrice').appendTo($li);
					var $calBtn = $('<button/>').html('<a href="../html/shopCar.html">去结算<a/>').appendTo($li);
					$li.appendTo($carList);					

					$carList.css({display:'block'});
				}).on('mouseout',function(){
					$carList.css({display:'none'});
				});

				// 加
				$carList.on('click','button',function(){
					if($(this).attr('class') === 'addGoods'){
						var currli = $(this).parent('li');
						var currId = currli.data('id');
						var currPri = currli.find('.price').text().slice(1)*1;
						for(var i = 0;i<arr.length;i++){
							if(arr[i].id == currId){
								arr[i].qty++;
								//console.log(arr[i].qty);
								currli.find('input').val(arr[i].qty);
								break;
							}
						}
						this.totalPrice(arr);
					}
				});

				// 减
				$carList.on('click','button',function(){
					if($(this).attr('class') === 'subGoods'){
						var currli = $(this).parent('li');
						var currId = currli.data('id');
						var currPri = currli.find('.price').text().slice(1)*1;
						if( currli.find('input').val() <= 1){
							//$carList.html('<li style="text-align:center;font-size:14px">您的购物车空空如也</li>');
							currli.remove();
				
							var total =0;
							var totalPrice = 0;
							for(var j=0;j<arr.length;j++){
								total += arr[j].qty;
								var str = arr[j].price;
								var pricNum = str.slice(1)*1;
								totalPrice += pricNum*arr[j].qty;
							}
			
							for(var i = 0;i<arr.length;i++){
								if(arr[i].id == currId){
									arr.splice(i,1);
								}
							}
							$total.find('span').text(total-1);
							$sidebar.find('i').text(total-1);
							$smallCar.find('i').text(total-1);
							com.setCookie('goodsList',JSON.stringify(arr),date,'/');
							totalPrice -= currPri;
							$totalPrice.find('span').text(totalPrice.toFixed(2));

						}else{
							for(var i = 0;i<arr.length;i++){
								if(arr[i].id == currId){
									arr[i].qty--;
									//return;
									currli.find('input').val(arr[i].qty);
									break;
								}
							}
							this.totalPrice(arr);
						}
					}
				});

				$carList.on('mouseover',function(){
					$carList.css({display:'block'});
					
				}).on('mouseout',function(){
					$carList.css({display:'none'});
				});

				return this;
			},
			totalPrice:function(arr){
				var total =0;
				var totalPrice = 0;
				for(var j=0;j<arr.length;j++){
					total += arr[j].qty;
					var str = arr[j].price;
					var pricNum = str.slice(1)*1;
					totalPrice += pricNum*arr[j].qty;
				}
				$total.find('span').text(total);
				$sidebar.find('i').text(total);
				$smallCar.find('i').text(total);
				com.setCookie('goodsList',JSON.stringify(arr),date,'/');
				totalPrice += currPri;
				$totalPrice.find('span').text(totalPrice.toFixed(2));
			}
		}*/
		//var b1 = new CarList(-100,-402,$sidebar.children().eq(1),goodsList);
		
		//将购物车定义成模块来使用
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

		// 吸顶搜索导航
		var $Mouting = $('<div/>').addClass('mouting').appendTo('#search');
		$('.vNav').clone().appendTo($Mouting);
		$('.mainSearch').clone().appendTo($Mouting);
		$(window).on('scroll',function(){
			if(window.scrollY >= 164){
				$Mouting.css({display:'block'});
			}else{
				$Mouting.css({display:'none'});
			}
		});
	});
});