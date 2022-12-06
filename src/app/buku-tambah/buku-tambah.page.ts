import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";
import { ApiService } from "../api.service";
import { Http } from "@capacitor-community/http";
@Component({
  selector: 'app-buku-tambah',
  templateUrl: './buku-tambah.page.html',
  styleUrls: ['./buku-tambah.page.scss'],
})
export class BukuTambahPage implements OnInit {
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
  ) { }

  ngOnInit() {
  }

  addBuku() {
    let url = this._apiService.apiUrl() + "/tambah.php";
    Http.request({
      method: "POST",
      url: url,
      headers: { "Content-Type": "application/json" },
      data: {
        seri: this.seri,
        judul: this.judul,
        nama: this.nama,
        tahun: this.tahun
      },
    }).then((data) => {
      this.seri = '';
      this.judul = '';
      this.nama = '';
      this.tahun = '';
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Berhasil input data Buku',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
      this.router.navigateByUrl('/buku');
    }, (error) => {
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal input data Buku',
        buttons: ['OK'],
      }).then(res => {
        res.present();
      });
    })
  }
}
