<?php
$data = file_get_contents('php://input');
$json_data = json_decode($data,true);
$file_path = 'data.json';
if (file_put_contents(".".$json_data["save_location"], $data)) {
    echo json_encode(array('success' => true));
} else {
    echo json_encode(array('success' => false));
}