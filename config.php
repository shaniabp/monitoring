<?php
$host = "localhost";
$user = "root"; // Default user XAMPP
$pass = "";
$dbname = "monitoring_kolam";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
