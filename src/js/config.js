require.config({
	// 解决缓存问题
	urlArgs: 'v=' + Date.now(),
	paths:{
		'jquery':'../lib/jquery-3.2.1',
		'BxCarousel':'../lib/jquery-BxCarousel/jquery.BxCarousel',
		'BxZoom':'../lib/jquery-BxZoom/jquery.BxZoom',
		'common':'common_module',
		'lazyload':'../lib/jquery.lazyload.min',
		'car':'car'
	},
	shim:{
		'BxCarousel':['jquery'],
		'BxZoom':['jquery'],
		'lazyload':['jquery'],
		'car':['jquery','common']
	}
});