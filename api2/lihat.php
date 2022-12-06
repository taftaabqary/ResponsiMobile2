<?php
require 'koneksi.php';
$data = [];
$seri = $_GET['seri'];
$query = mysqli_query($koneksi, "SELECT * FROM buku WHERE seri = '$seri'");
$jumlah = mysqli_num_rows($query);
if ($jumlah == 1) {
    $row = mysqli_fetch_object($query);
    $data = $row;
}

echo json_encode($data);
echo mysqli_error($koneksi);
