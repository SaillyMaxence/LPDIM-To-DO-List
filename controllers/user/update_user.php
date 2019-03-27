<?php
require("../../database/init.php");

$stmt = $dbh->prepare("UPDATE user SET user_name = ? WHERE user_id = ?");
$stmt->bindValue(1,$_GET['name']);
$stmt->bindValue(2,$_GET['id']);
$stmt->execute();

echo json_encode("success");


?>