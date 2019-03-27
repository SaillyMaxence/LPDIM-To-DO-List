<?php
require("../../database/init.php");

$stmt = $dbh->prepare("DELETE FROM task WHERE task_id = ?");
$stmt->bindParam(1, $_GET['id']);
$stmt->execute();
echo json_encode("success");

?>