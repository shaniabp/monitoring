<?php
include 'db.php';

$tanggal = isset($_GET['tanggal']) ? $_GET['tanggal'] : date("d");
$bulan = isset($_GET['bulan']) ? $_GET['bulan'] : date("m");
$tahun = isset($_GET['tahun']) ? $_GET['tahun'] : date("Y");

$sql = "SELECT * FROM sensor_data WHERE DAY(waktu) = '$tanggal' AND MONTH(waktu) = '$bulan' AND YEAR(waktu) = '$tahun' ORDER BY waktu DESC";
$result = mysqli_query($conn, $sql);

$data = [];
while ($row = mysqli_fetch_assoc($result)) {
    $data[] = $row;
}

echo json_encode($data);
?>
