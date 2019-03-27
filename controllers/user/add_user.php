<?php
require("../../database/init.php");

$stmt = $dbh->prepare("INSERT INTO user (user_name) VALUES (?)");
$stmt->bindValue(1,$_GET['user']);

$stmt->execute();

echo json_encode("success");


?>