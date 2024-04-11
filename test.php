<?php
$quizid=$_REQUEST["created_time"];
$save_location=$_REQUEST["save_location"];
$author=$_REQUEST["author"];
$conn = mysqli_connect("localhost", "root", "", "quiz_info");
if (!$conn) {
    die("Connect Error: " . mysqli_connect_error());
}
$sql = "Insert into `quizs_info` (`Quizid`,`Quiz_save_folder`,`Quiz_Author`) VALUES ($quizid, $save_location,$author)";
if($result = mysqli_query($conn, $sql)){
    echo json_encode(array('success'=> true));
}
mysqli_close($conn);
