<?php
require("../../database/init.php");

$stmt = $dbh->prepare("UPDATE task SET task_name = ? WHERE task_id = ?");
$stmt->bindValue(1,$_GET['message']);
$stmt->bindValue(2,$_GET['id']);
$stmt->execute();

echo json_encode("success");


?>