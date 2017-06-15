<?php
	include 'connect.php';
	$sql = "select * from address";
	$res = $conn->query($sql);
	$msg = $res->fetch_all(MYSQLI_ASSOC);
	echo json_encode($msg,JSON_UNESCAPED_UNICODE);
	//关闭连接
	$conn->close();
?>