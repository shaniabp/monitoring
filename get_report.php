<?php
include 'koneksi.php';

$range = $_GET['range'] ?? '1jam';

if ($range == "1jam") {
    $query = "SELECT * FROM data_sensor WHERE waktu >= NOW() - INTERVAL 1 HOUR ORDER BY waktu DESC";
} elseif ($range == "1hari") {
    $query = "SELECT * FROM data_sensor WHERE waktu >= NOW() - INTERVAL 1 DAY ORDER BY waktu DESC";
} elseif ($range == "1bulan") {
    $query = "SELECT * FROM data_sensor WHERE waktu >= NOW() - INTERVAL 1 MONTH ORDER BY waktu DESC";
} else {
    echo json_encode([]);
    exit;
}

$result = mysqli_query($conn, $query);
$data = [];

while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>
