<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Origin: *");
$conn = mysqli_connect("localhost","cj_cc","123456","cj_cc");
if (!$conn) die("连接数据库失败");
//$user = json_decode($_POST['data']);
//if ( empty($_POST['id']) || empty($_POST['pw'])){
//    echo "没有post数据";
//    exit;
//}
$postData = json_decode(file_get_contents('php://input'), true);
$id = $postData['id'];
$pw = $postData['pw'];
//echo $_POST['uname'];
$sql = "select pw from user where id ='".$id."'";
//echo $sql;
$result = mysqli_query($conn,$sql);
//var_dump(mysqli_fetch_array($result));
//echo "密码:".mysqli_fetch_array($result)['pw'];
$arr = [];
if (mysqli_fetch_array($result)['pw'] == $pw && $pw){
    $arr['code'] = 200;
    $arr['lv']= mysqli_query($conn,"select lv from user where id='".$id."'");
    $arr['lv'] = mysqli_fetch_array($arr['lv'])[0][0];
    $arr['msg'] = "登录成功啦!";
}else{
    $arr['code'] = 100;
    $arr['msg'] = "账号或密码错误!";
}
header('content-type:application/json');
echo json_encode($arr);

//header("Access-Control-Allow-Origin: *");
//
//// 获取POST请求的数据
//$postData = json_decode(file_get_contents('php://input'), true);
//$id = $postData['id'];
//$pw = $postData['pw'];
//
//// 模拟验证过程
//if ($id === 'admin' && $pw === 'password') {
//    $response = [
//        'code' => 200,
//        'message' => '登录成功'
//    ];
//} else {
//    $response = [
//        'code' => 401,
//        'id' => $id,
//        'pw' => $pw,
//        'message' => '用户名或密码错误'
//    ];
//}
//
//// 返回JSON格式的响应
//header('Content-Type: application/json');
//echo json_encode($response);
?>
