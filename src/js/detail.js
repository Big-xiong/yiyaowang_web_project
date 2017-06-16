require(['config'],function(){
	require(['jquery','common','car','BxZoom'],function($,com,car){
		// 生成送货地址
		var $top = $('#top');
		var date = new Date();
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

		// 根据数据生成商品详情
		var str = location.search.slice(1);
		var arr = str.split('=');
		var goodsId = arr[1];

		$.ajax({
			url:'../api/goodslist.php',
			dataType:'json',
			async:false,
			success:function(res){
				for(var i=0;i<res.length;i++){
					if(res[i].id == goodsId){
						$('.mid').data('id',goodsId);
						$('<p/>').text('药网价:').addClass('price').prependTo($('.mid'));
						$('<h1/>').text(res[i].title).prependTo($('.mid'));
						$('<span/>').text(res[i].price).appendTo($('.price'));
						$('<img/>').attr({src:'../'+res[i].imgurl}).attr('data-big','../'+res[i].imgurl).appendTo($('.goodsPic'));
						$('<img/>').attr({src:'../'+res[i].imgurl}).appendTo($('.picDetail'));
					}
				}
			}
		});
		//console.log(arr);

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
	});
});