<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "monitoring_kolam";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Koneksi gagal"]));
}

// Ambil data terbaru
$sql = "SELECT suhu, ph, tds FROM sensor_data ORDER BY waktu DESC LIMIT 1";
$result = $conn->query($sql);

$data = $result->fetch_assoc();
$conn->close();

echo json_encode($data);
?>
