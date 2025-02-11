<?php
include 'config.php';

$sql = "SELECT * FROM sensor_data WHERE waktu >= NOW() - INTERVAL 1 MONTH ORDER BY waktu DESC";
$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>
