// 创建登录日志，让php去完成数据库的增删查改，nodejs来完成日志的修改
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();

app.get('/',function(req,res){
	// nodejs专门写文件
	fs.readFile('../log/login_log.txt',function(err,data){
		var content = data.toString() + req.query.phone + '/'+req.query.password + '  ';
		fs.writeFile('../log/login_log.txt',content,function(err){

		});
	});
	// 通信php，服务器向服务器传递数据
	console.log(req.query.phone);
	http.request({
		hostname:'localhost',
		port:2000,
		path: '/api/login.php?phone='+req.query.phone+'&password='+req.query.password,
		method: 'get'
	},function(req){
		req.setEncoding('utf8');
		var data = "";
		req.on('data', function(chunk) {
			// 拿到php返回的数据
			data += chunk
		});
		req.on('end', function() {
			console.log(data);
			res.send(data);
		});
	}).end();
	res.setHeader('Access-Control-Allow-Origin','*');
});
app.listen(8008);
console.log('服务器开启');