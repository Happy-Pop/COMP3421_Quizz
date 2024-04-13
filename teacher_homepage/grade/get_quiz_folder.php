<?php
$quiz_id = $_REQUEST["quiz_id"];
$conn = mysqli_connect("localhost", "root", "", "quiz_info");
if (!$conn) {
    die("Connect Error: " . mysqli_connect_error());
}
$conn = mysqli_connect("localhost", "root", "", "quiz_info");
if (!$conn) {
    die("Connect Error: " . mysqli_connect_error());
}
$sql = "select * from quizs_info where Quizid ='$quiz_id'";
$result = mysqli_query($conn, $sql);
echo $result->fetch_assoc()["Quiz_save_folder"];