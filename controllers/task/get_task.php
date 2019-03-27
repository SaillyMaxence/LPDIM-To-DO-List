<?php
require("../../database/init.php");

$stmt = $dbh->prepare("SELECT * FROM task");
$stmt->execute();
$return = $stmt->fetchAll();

echo json_encode($return);


?>