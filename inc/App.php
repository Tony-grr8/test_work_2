<?php
include_once 'Db.php';

$db = new Database();
$conn = $db->createConnection();
$res_arr = [];

$year = "";
$month = "";
if(isset($_POST["year"]) && isset($_POST["month"])){
  
    $year = $_POST["year"];
    $month = $_POST["month"]; 
    $cal = cal_days_in_month(CAL_GREGORIAN, $month, $year);   
    $sql_query = "SELECT users.id, users.fullName, SUM(tasks.spentTime) AS totalSpentTime FROM users inner JOIN tasks ON tasks.user_id = users.id WHERE (users.role='executor'  AND tasks.startDate >= '$year-$month-01' AND tasks.startDate <= '$year-$month-$cal') GROUP BY users.id";
    $results = $conn->query($sql_query);
    foreach($results as $row) {
       $res_arr[] = array('id'=>$row['id'], 'name'=>$row['fullName'], 'fullTime'=>$row['totalSpentTime']); 
    }
    if (count($res_arr) > 0) {
        echo json_encode($res_arr);  
    }
    else {
        $res_arr[] = array('id'=>'Отсутствуют', 'name'=>"данные за выбранную дату", 'fullTime'=>'0');
        echo json_encode($res_arr); 
    }  
}

?>