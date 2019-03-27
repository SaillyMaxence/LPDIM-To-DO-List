<?php
require("../../database/init.php");

$stmt = $dbh->prepare("INSERT INTO task (task_name,task_date) VALUES (?,?)");
$stmt->bindValue(1,$_GET['message']);
$stmt->bindValue(2, date("Y-m-j"));
$stmt->execute();

echo json_encode("success");


?>