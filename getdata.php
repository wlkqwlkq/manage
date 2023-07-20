<?php

//$conn = mysqli_connect("localhost","cj_cc","123456","cj_cc");
////查
//$chaxun_sql = "select * from mall";
//$result = mysqli_query($conn,$chaxun_sql);
//$arr = [];
//while ($row = $result->fetch_assoc()) {
//    // 打印每行数据
//    array_push($arr,$row);
//}
//echo json_encode($arr)."\n";



$conn = mysqli_connect("localhost","cj_cc","123456","cj_cc");
if (!$conn){
    die("连接失败");
}
$postData = json_decode(file_get_contents('php://input'), true);
$type  = $postData['type'];
$arr = [];
//查询所有数据
if ($type == 'getData') {
//查
    $chaxun_sql = "select * from mall";
    $result = mysqli_query($conn, $chaxun_sql);
    while ($row = $result->fetch_assoc()) {
        // 打印每行数据
        array_push($arr,$row);
    }
} elseif($type == 'query'){
    $keyword = $postData['keyword'];//关键词
    $sql = "SELECT * FROM mall WHERE m_name LIKE '%".$keyword."%'";
    $result = mysqli_query($conn,$sql);
    if ($result){
       while ($row = $result->fetch_assoc()){
           array_push($arr,$row);
        }
    }else{
        $arr=[
            "code" => 100,
            "msg" => "没有相关记录"
        ];
    }
}elseif ($type == 'upData') {
    //修改数据
    $id = $postData['id'];
    $name = $postData['m_name'];
    $price = $postData['price'];
    $kind = $postData['kind'];
    $sum = $postData['sum'];
    $sell = $postData['sell'];
    $inventory = $sum - $sell;
    $sql = "update mall set m_name = '" . $name . "',price = '" . $price . "',kind = '" . $kind . "',sum = '" . $sum . "',sell= '" . $sell . "',inventory= '" . $inventory . "' where id = '" . $id . "'";
    $result = mysqli_query($conn, $sql);
    if ($result) {
        $arr = [
            "code" => 200,
            "msg" => "修改成功了"
        ];
    } else {
        $arr = [
            "code" => 100,
            "msg" => "修改失败了"
        ];
    }
}elseif($type == 'delete'){
    $id = $postData['id'];
    $sql = "delete  from mall where id = '".$id."'";
    $result = mysqli_query($conn,$sql);
    if ($result){
        $arr = [
            "code" => 200,
            "msg" => "删除成功"
        ];
    }else{
        $arr = [
            "code" => 100,
            "msg" => "删除失败"
        ];
    }
}elseif($type == "addData"){
    $name = $postData['m_name'];
    $price = $postData['price'];
    $kind = $postData['kind'];
    $sum = $postData['sum'];
    $sql = "INSERT INTO `mall`(`m_name`, `id`, `price`, `kind`, `sum`, `inventory`, `sell`) VALUES ('".$name."',NULL,'".$price."','".$kind."','".$sum."',0,0)";
    $result = mysqli_query($conn,$sql);
    if ($result){
        $arr = [
            "code" => 200,
            "msg" => "添加成功"
        ];
    }else{
        $arr = [
            "code" => 100,
            "msg" => "添加失败"
        ];
    }
}else {
    echo json_encode("出错了");
}
//输出结果
if(empty($arr)){
    echo json_encode("出错了");
}else{
    echo json_encode($arr);
}

//添加数据