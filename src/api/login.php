<?php
	// 引入其他php文件
	include 'connect.php';

	$phone = isset($_GET['phone']) ? $_GET['phone'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';

	// md5加密
	$password = md5($password);

	$sql = "select * from clientmsg where phone='$phone' and password='$password'";

	// 获取查询结果
	$res = $conn->query($sql);

	// 使用查询结果
	$rows =$res->fetch_all(MYSQLI_ASSOC);

	/*$sql2 = "select password from clientmsg where phone='$phone'";
	$msg = $conn->query($sql2);
	$psw = $msg->fetch_all(MYSQLI_ASSOC);*/

	//print_r($psw);
	if($rows){
		echo 'ok';
	}else{
		echo "Error: " . $sql2 . "<br>" . $conn->error;
	}


	//关闭连接
	$conn->close();
?>