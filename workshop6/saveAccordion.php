<?php
$data = json_decode(file_get_contents("php://input"), true);

if ($data && isset($data["accordion"])) {
    file_put_contents("accordion.json", json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
    echo "Accordion successfully saved!";
} else {
    echo "Error, no data to be saved.";
}
?>