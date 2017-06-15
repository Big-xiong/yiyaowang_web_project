<?php
	// 引入其他php文件
	include 'connect.php';

	$phone = isset($_GET['phone']) ? $_GET['phone'] : '';
	$password = isset($_GET['password']) ? $_GET['password'] : '';

	// md5加密
	$password = md5($password);

	$sql = "select id from clientmsg where phone='$phone'";

	// 获取查询结果
	$res = $conn->query($sql);

	$rows =$res->fetch_all(MYSQLI_ASSOC);
	//echo json_encode($rows,JSON_UNESCAPED_UNICODE);

	if($rows != null){
		echo 'no';
	}else{ 
		$sql2 = "insert into clientmsg(phone,password) values('$phone','$password')";
		$msg = $conn->query($sql2);
		if($msg){
			echo "ok";
		}else{
			echo "Error: " . $sql2 . "<br>" . $conn->error;
		}
	}

	//关闭连接
	$conn->close();
?>