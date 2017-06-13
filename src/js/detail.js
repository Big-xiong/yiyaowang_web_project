require(['config'],function(){
	require(['jquery','common','BxZoom'],function($,com){
		// 生成送货地址
		var $top = $('#top');
		var date = new Date();
		// console.log(cookieExpires);
		$.ajax({
			url:'../api/address.php',
			dataType:'json',
			success:function(data){
				console.log(data);
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

		// 商品放大镜
		var $goodsMsg = $('.goodsMsg');
		var $goodsPic = $('.goodsPic');
		$goodsPic.BxZoom({
			width:380,
			height:380,
			position:'right',
			gap:6
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

		//小图hover
		var $picDetail = $('.picDetail');
		var $currentImg = $picDetail.find('span');
		$picDetail.on('mouseover','img',function(){
			$currentImg.css({left:$(this).index()*51});
			$goodsPic.children().attr({src:$(this).attr('src')});
			$goodsPic.find('img').attr('data-big',$(this).attr('src'));
		});

		// 点击改变商品数量
		var $goodsNum = $('.goodsNum');
		var num;
		$goodsNum.children('button').eq(0).on('click',function(){
			num = $goodsNum.children('input').val();
			if(num <= 1){
				num = 1;
			}else{
				num--	
			}
			$goodsNum.children('input').attr({value:num});
			//console.log(num);

		});
		$goodsNum.children('button').eq(1).on('click',function(){
			num = $goodsNum.children('input').val();
			num++;
			$goodsNum.children('input').attr({value:num});
		});

		//飞入购物车
		var $add = $('.add');
		var $smallCar = $('.smallCar');

		//用cookie来保存商品信息
		var $goodsMid = $('.mid');
		var goodsList = com.getCookie('goodsList');
		goodsList = goodsList ? JSON.parse(goodsList) :[];

		$add.on('click',function(){
			var $cloneImg = $goodsPic.children('img').clone().prependTo($goodsMsg).css({position:'absolute',top:$goodsMsg.offset().top,left:$goodsMsg.offset().left,width:300,height:300});
			var currId = $goodsMid.data('id');
			
			// 遍历数组中的对象看是否已经存在该商品
			var num = $goodsNum.children('input').val()*1;
			for(var i = 0;i<goodsList.length;i++){
				if(goodsList[i].id === currId ){
					goodsList[i].qty += num ;
					break;
				}
			}
			if( i === goodsList.length ){
				var goods = {
					id:currId,
					imgurl:$picDetail.children('img').eq(0).attr('src'),
					title:$goodsMid.children('h1').text(),
					price:$('.price').children('span').text(),
					qty:$('.goodsNum').children('input').val()*1,
				}
				goodsList.push(goods);	
			}

			

			com.setCookie('goodsList',JSON.stringify(goodsList),date,'/');

			$cloneImg.animate({
				left:$sidebar.children().eq(1).offset().left,
                top:$sidebar.children().eq(1).offset().top,
                width:0,
                height:0
			},function(){
				$cloneImg.remove();
				var num = $goodsNum.children('input').val();
				var currNum = Number($sidebar.find('i').text())+Number(num);
				total(goodsList);
			});
			return false;
		});	

		// 面向对象创建购物车列表
		var numb = $sidebar.children().eq(1).find('i').text();
		function CarList(top,left,ele,msg,numb){
			this.top = top;
			this.left = left;
			this.width = 400;
			this.height = 240;
			this.ele = ele;
			this.msg = msg;
			this.init(numb); 
		}

		CarList.prototype ={
			init:function(numb){
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
					$totalPrice = $('<p/>').html('合计:<span style="color:#f00">'+totalPrice+'<span/>').addClass('totalPrice').appendTo($li);
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
						var total =0;
						var totalPrice = 0;
						for(var j=0;j<arr.length;j++){
							total += arr[j].qty;
							var str = arr[j].price;
							var pricNum = str.slice(1)*1;
							totalPrice += pricNum*arr[j].qty;
						}
						//console.log(total);
						$total.find('span').text(total);
						$sidebar.find('i').text(total);
						$smallCar.find('i').text(total);
						com.setCookie('goodsList',JSON.stringify(arr),date,'/');
						totalPrice += currPri;
						$totalPrice.find('span').text(totalPrice.toFixed(2));
					}
				});

				// 减
				$carList.on('click','button',function(){
					if($(this).attr('class') === 'subGoods'){
						var currli = $(this).parent('li');
						var currId = currli.data('id');
						var currPri = currli.find('.price').text().slice(1)*1;
						if( currli.find('input').val() <= 0){
							$carList.html('<li style="text-align:center;font-size:14px">您的购物车空空如也</li>');
						}else{
							for(var i = 0;i<arr.length;i++){
								if(arr[i].id == currId){
									arr[i].qty--;
									//return;
									currli.find('input').val(arr[i].qty);
									break;
								}
							}
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
							totalPrice -= currPri;
							$totalPrice.find('span').text(totalPrice.toFixed(2));
						}
					}
				});

				$carList.on('mouseover',function(){
					$carList.css({display:'block'});
					
				}).on('mouseout',function(){
					$carList.css({display:'none'});
				});

				return this;
			}
		}


		new CarList(-100,-402,$sidebar.children().eq(1),goodsList,numb);

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
	});
});