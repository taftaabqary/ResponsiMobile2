<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input, true);
$pesan = [];
$seri = $data['seri'];
$judul = $data['judul'];
$nama = $data['nama'];
$tahun = $data['tahun'];

$query = mysqli_query($koneksi, "UPDATE buku SET judul='$judul',nama = '$nama',tahun = '$tahun' WHERE seri='$seri'");
// if ($query) {
//     http_response_code(201);
//     $pesan['status'] = 'sukses';
// } else {
//     http_response_code(422);
//     $pesan['status'] = 'gagal';
// }

echo json_encode($pesan);
echo mysqli_error($koneksi);
