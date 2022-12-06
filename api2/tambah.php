<?php

require 'koneksi.php';

$input = file_get_contents('php://input');
$data = json_decode($input, true);

$pesan = [];
$seri = trim($data['seri']);
$judul = trim($data['judul']);
$nama = trim($data['nama']);
$tahun = trim($data['tahun']);

$query = mysqli_query($koneksi, "INSERT INTO buku(seri,judul,nama,tahun) VALUES ('$seri','$judul','$nama','$tahun')");
if ($query) {
    http_response_code(201);
    $pesan['status'] = 'sukses';
} else {
    http_response_code(422);
    $pesan['status'] = 'gagal';
}

echo json_encode($pesan);
echo mysqli_error($koneksi);
