<?php
header("Content-Type: application/json");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "monitoring_kolam";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Periksa koneksi
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Ambil data terbaru dari database
$sql = "SELECT suhu, ph, tds FROM sensor_data ORDER BY waktu DESC LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode($row);
} else {
    echo json_encode(["suhu" => "--", "ph" => "--", "tds" => "--"]);
}

$conn->close();
?>
