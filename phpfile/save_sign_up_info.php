<?php
$email=$_REQUEST["email"];
$password=$_REQUEST["password"];
$conn = mysqli_connect("localhost", "root", "", "quiz_info");
if (!$conn) {
    die("Connect Error: " . mysqli_connect_error());
}
$sql = "Insert into user_info (user_email, user_password)
VALUES ($email, $password)";
$result = mysqli_query($conn, $sql);
?>