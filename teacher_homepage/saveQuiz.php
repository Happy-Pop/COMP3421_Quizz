<?php
$data = file_get_contents('php://input');
$json_data = json_decode($data,true);
$file_path = 'data.json';
if (file_put_contents($json_data["save_location"], $data)) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false));
}
$quizid=$json_data["created_time"];
$save_location=$json_data["save_location"];
$author=$json_data["author"];
$title=$json_data["title"];
$Quiz_created_time=$json_data["Quiz_created_time"];
$conn = mysqli_connect("localhost", "root", "", "quiz_info");
if (!$conn) {
    die("Connect Error: " . mysqli_connect_error());
}
$sql = "Insert into quizs_info (Quiz_created_time, Quiz_title, Quizid ,Quiz_save_folder,Quiz_Author) VALUES ('$Quiz_created_time','$title','$quizid', '$save_location','$author')";
$result = mysqli_query($conn, $sql);
echo json_encode(array('success' => true));