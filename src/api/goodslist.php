<?php
	// 引入其他文件
	include 'connect.php';

	// SQL语句
	$sql = "select * from goodslist";

	// 获取查询结果
	$res = $conn->query($sql);

	// 使用查询结果
	$msg = $res->fetch_all(MYSQLI_ASSOC);

	echo json_encode($msg,JSON_UNESCAPED_UNICODE);

	//echo "我是php,我可以同步了，我已经同步了";

?>