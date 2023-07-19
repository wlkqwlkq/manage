<?php
$conn = mysqli_connect("localhost","cj_cc","123456","cj_cc");
if (!$conn) die("连接数据库失败");
if (empty($_POST['uname']) || empty($_POST['id']) || empty($_POST['pw'])){
    exit;
}
$uname = $_POST['uname'];
$id = $_POST['id'].trim();
$pw = $_POST['pw'].trim();
$arr = [];
$r = mysqli_query($conn,"select 1 from user where id ='".$id."'");
$sql = "INSERT INTO `user`(`uname`, `id`, `pw`, `lv`) VALUES ('$uname','$id','$pw',0)";
echo $sql;
$result = mysqli_query($conn,$sql);
if (!$result) {
    $arr['code'] = 100;
    $arr['msg'] = "注册失败了";
}else{
    $arr['code'] = 200;
    $arr['msg'] = "注册成功了";
}
return $arr;
