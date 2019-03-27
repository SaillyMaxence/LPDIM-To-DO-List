<?php
require("../../database/init.php");

$stmt = $dbh->prepare("SELECT * FROM user");
$stmt->execute();
$return = $stmt->fetchAll();

echo json_encode($return);


?>