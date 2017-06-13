var gulp = require('gulp');
var sass = require('gulp-sass');
var broswerSync = require('browser-sync');
 

gulp.task('compileSass',function(){
	console.log(666);
	gulp.src('./src/sass/*.scss')

	.pipe(sass())

	.pipe(gulp.dest('./src/css'))
});

gulp.task('jtSass',function(){
	gulp.watch('./src/sass/*.scss',['compileSass']);
});

gulp.task('server',function(){
	broswerSync({
		// 设置服务器路径(静态服务器)
		//server:'./src/',

		// 服务器代理:将php文件的端口改成browser-sync的端口进行代理
		proxy:'http://localhost:2000',

		// 监听文件修改
		files:['./src/**/*.html','./src/css/*.css','./src/js/*.js','./src/api/*.php']
	});

	// 监听scss文件的修改
	gulp.watch('./src/sass/*.scss',['compileSass']);
});