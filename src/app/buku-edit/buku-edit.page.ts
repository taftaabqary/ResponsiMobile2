import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { ApiService } from "../api.service";
import { Http } from "@capacitor-community/http";

@Component({
  selector: 'app-buku-edit',
  templateUrl: './buku-edit.page.html',
  styleUrls: ['./buku-edit.page.scss'],
})
export class BukuEditPage implements OnInit {
  seri: any;
  judul: any;
  nama: any;
  tahun: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
  ) {
    this.route.params.subscribe((param: any) => {
      this.seri = param.seri;
      console.log(this.seri);
      this.ambilBuku(this.seri);
    })
  }

  ngOnInit() {
  }

  ambilBuku(seri) {
    this._apiService.ambilBuku(seri).subscribe((res: any) => {
      console.log("Sukses", res);
      let buku = res;
      this.nama = buku.nama;
      this.judul = buku.judul;
      this.tahun = buku.tahun;
    }, (error: any) => {
      console.log('Error', error);
      alert('Gagal ambil data');
    })
  }

  editBuku() {
    let url = this._apiService.apiUrl() + "/edit.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: {
        seri: this.seri,
        judul: this.judul,
        nama: this.nama,
        tahun: this.tahun,
      },
    }).then((data) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil Edit Data Buku',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/buku');
    }, (err) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal Edit Data Buku',
        buttons: ['OK']
      }).then(res => {
        res.present()
      });
    })
  }

}
