<?php
$email = $_REQUEST["email"];
$password = $_REQUEST["password"];
$conn = mysqli_connect("localhost", "root", "", "quiz_info");
if (!$conn) {
    die("Connect Error: " . mysqli_connect_error());
}
$sql = "select * from user_info where user_email='$email' and user_password	='$password'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) == 1) {
    $sql = "select user_identity from user_info where user_email='$email' and user_password	='$password'";
    $result = mysqli_query($conn, $sql);
    echo $result->fetch_assoc()["user_identity"];
} else {
    echo "False";
}
