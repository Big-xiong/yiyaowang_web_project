define(['jquery','common'],function($,com){
	/*this.top = top;
	this.left = left;
	this.width = 400;
	this.height = 240;
	this.ele = ele;
	this.msg = msg;*/
	return{
		/*r:function(){
			console.log(this.top);
		},*/
		init:function(top,left,ele,msg,$smallCar){
			var $carList = $('<ul/>').css({width:400,height:240,border:'1px solid #f00',position:'absolute',top:top,left:left,display:'none',backgroundColor:'#fff',overflow:'auto'});
			var arr = msg;
			var currP = ele;
			var p = currP.parent();
			var $total;
			var $totalPrice;
			var date = new Date();
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
					var pricNum = str*1;
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
					var currPri = currli.find('.price').text()*1;
					console.log(currPri);
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
						var pricNum = str*1;
						totalPrice += pricNum*arr[j].qty;
					}
					$total.find('span').text(total);
					p.find('i').text(total);
					$smallCar.find('i').text(total);
					com.setCookie('goodsList',JSON.stringify(arr),date,'/');
					//totalPrice += currPri;
					$totalPrice.find('span').text(totalPrice.toFixed(2));
					//this.totalPrice(arr);
				}
			});

			// 减
			$carList.on('click','button',function(){
				if($(this).attr('class') === 'subGoods'){
					var currli = $(this).parent('li');
					var currId = currli.data('id');
					var currPri = currli.find('.price').text()*1;
					if( currli.find('input').val() <= 1){
						//$carList.html('<li style="text-align:center;font-size:14px">您的购物车空空如也</li>');
						currli.remove();
			
						var total =0;
						var totalPrice = 0;
						for(var j=0;j<arr.length;j++){
							total += arr[j].qty;
							var str = arr[j].price;
							var pricNum = str*1;
							totalPrice += pricNum*arr[j].qty;
						}
		
						for(var i = 0;i<arr.length;i++){
							if(arr[i].id == currId){
								arr.splice(i,1);
							}
						}
						$total.find('span').text(total-1);
						p.find('i').text(total-1);
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
						var total =0;
						var totalPrice = 0;
						for(var j=0;j<arr.length;j++){
							total += arr[j].qty;
							var str = arr[j].price;
							var pricNum = str*1;
							totalPrice += pricNum*arr[j].qty;
						}
						$total.find('span').text(total);
						p.find('i').text(total);
						$smallCar.find('i').text(total);
						com.setCookie('goodsList',JSON.stringify(arr),date,'/');
						//totalPrice += currPri;
						$totalPrice.find('span').text(totalPrice.toFixed(2));
						//this.totalPrice(arr);
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
		totalPrice:function(arr,$total,$sidebar,$smallCar,$totalPrice){
			var total =0;
			var totalPrice = 0;
			for(var j=0;j<arr.length;j++){
				total += arr[j].qty;
				var str = arr[j].price;
				var pricNum = str*1;
				totalPrice += pricNum*arr[j].qty;
			}
			$total.find('span').text(total);
			$sidebar.find('i').text(total);
			$smallCar.find('i').text(total);
			com.setCookie('goodsList',JSON.stringify(arr),date,'/');
			totalPrice += currPri;
			$totalPrice.find('span').text(totalPrice.toFixed(2));

			return this;
		}	
	}
});