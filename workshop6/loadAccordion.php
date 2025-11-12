<?php
header('Content-Type: application/json; charset=utf-8');

if (file_exists("accordion.json")) {
    echo file_get_contents("accordion.json");
} else {
    echo json_encode(["accordion" => []], JSON_UNESCAPED_UNICODE);
}
?>