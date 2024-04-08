<?php
$email = $_REQUEST["email"];
$conn = mysqli_connect("localhost", "root", "", "quiz_info");
if (!$conn) {
    die("Connect Error: " . mysqli_connect_error());
}
$sql = "select * from user_info where user_email='$email'";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) == 0) {
    echo "True";

} else {  
    echo "False";
}
?>