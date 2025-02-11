<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "monitoring_kolam";

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Tangkap data dari ESP32
$suhu = $_POST['suhu'];
$ph = $_POST['ph'];
$tds = $_POST['tds'];

$sql = "INSERT INTO sensor_data (suhu, ph, tds, waktu) VALUES ('$suhu', '$ph', '$tds', NOW())";

if ($conn->query($sql) === TRUE) {
    echo "Data berhasil disimpan";
} else {
    echo "Error: " . $conn->error;
}

$conn->close();
?>
