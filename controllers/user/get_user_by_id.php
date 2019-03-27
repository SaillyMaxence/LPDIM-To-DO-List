<?php
require("../../database/init.php");

$stmt = $dbh->prepare("SELECT * FROM user where user_id = ?");
$stmt->bindParam(1,$_GET['id']);
$stmt->execute();
$return = $stmt->fetchAll();

echo json_encode($return);


?>
