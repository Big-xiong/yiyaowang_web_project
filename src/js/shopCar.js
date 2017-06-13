require(['config'],function(){
	require(['jquery','common'],function($,com){
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

		// 面向对象创建购物车
		function CarList(top,left,ele,msg,numb){
			this.top = top;
			this.left = left;
			this.width = 400;
			this.height = 200;
			this.ele = ele;
			this.msg = msg;
			this.init(numb); 
		}

		CarList.prototype ={
			init:function(numb){
				var $carList = $('<ul/>').css({width:this.width,height:this.height,border:'1px solid #f00',position:'absolute',top:this.top,left:this.left,display:'none',backgroundColor:'#fff',overflow:'auto',paddingBottom:50});
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
					var $li = $('<li/>').addClass('bottom').css({position:'fixed',bottom:18,right:107,height:30,width:373,backgroundColor:'#f7f7f7'});
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
					var $calBtn = $('<button/>').html('<a>去结算<a/>').appendTo($li);
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
						com.setCookie('goodsList',JSON.stringify(arr));
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
							com.setCookie('goodsList',JSON.stringify(arr));
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
	});
});