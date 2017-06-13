

;(function($){
	// $.prototype = $.fn
	$.prototype.BxCarousel = function(options){
		// 添加默认属性
		var defaults = {
			width:810,
			height:320,
			index:0,
			autoPlay:true
		}
		// 扩展默认属性,覆盖默认值
		var opt = $.extend({},defaults,options);

		// this指向实例，jquery对象
		this.each(function(){
			// 自动播放
			if(opt.autoPlay == true){
				// 这里的this指向DOM节点
				$(this).addClass('BxCarousel');

				// 生成图片结构
				var $ul = $('<ul/>');
				$ul.html($.map(opt.imgs,function(item){
					return `<li><img src="${item}"></li>`;
				}).join(''));
				//console.log(opt.imgs[0]);
				$ul.append(`<li><img src="${opt.imgs[0]}"></li>`)
				$(this).append($ul);

				// 添加页码
				var $page = $('<div/>').addClass('page');
				$page.html($.map(opt.imgs,function(item,idx){
					if(idx == opt.index){
						return `<span class="active">${idx+1}</span>`;
					}else{
						return `<span>${idx+1}</span>`;
					}
				}).join(''));
				$(this).append($page);
				

				// 图片动画
				var index = opt.index;
				//初始化显示第几张图
				$ul.css({top:-opt.height*index});
				setInterval(function(){
					index++;
					showPic();
				},5000);			
			}
			// 点击左右切换
			else if(opt.autoPlay == false){

				$(this).addClass('BxCarousel');

				// 生成图片结构
				var $ul = $('<ul/>');
				$ul.html($.map(opt.imgs,function(item){
					return `<li><img src="${item}"></img></li>`;
				}).join(''));
				$(this).append($ul);

				// 不自动播放时添加点击按钮
				var $Lbtn = $('<a>&lt</a>').css({
					position:'absolute',width:40,height:40,float:'left',top:0,
					backgroundColor:'#ddd',left:0,color:'#fff',opacity:0.5,
					textAlign:'center'
				});
				var $Rbtn = $('<a>&gt</a>').css({
					positon:'absolute',width:40,height:40,float:'right',top:0,
					backgroundColor:'#ddd',right:0,zIndex:100,color:'#fff',opacity:0.5,
					textAlign:'center'
				});
				$(this).append($Lbtn);
				$(this).append($Rbtn);
				var index = opt.index;
				$ul.css({top:-opt.height*index});
				$Lbtn.on('click',function(){
					index--;
					if(index <= 0){
						index = opt.imgs.length-1;
					}
					$ul.animate({top:-opt.height*index},2000);
				});
				$Rbtn.on('click',function(){
					index++;
					if(index >= opt.imgs.length-1){
						index = 0;
					}
					$ul.animate({top:-opt.height*index},2000);
				});	
			}


			function showPic(){
				//console.log(opt.imgs.length);
				if(index > opt.imgs.length){
					index = 0;

					$ul.css('top',0);

					index = 1;
				}
				$ul.animate({top:-opt.height*index},2000).delay(1000);
				// 给页码添加高亮
				if(index == opt.imgs.length){
					$page.children().eq(0).addClass('active').siblings().removeClass('active');
				}else{
					$page.children().eq(index).addClass('active').siblings().removeClass('active');		
				}
			}

			
		});
	}
})(jQuery);