import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Preferences } from '@capacitor/preferences';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

const USERNAME = 'namasaya';

@Component({
  selector: 'app-buku',
  templateUrl: './buku.page.html',
  styleUrls: ['./buku.page.scss'],
})
export class BukuPage {
  public nama = ''; //init variable nama untuk namauser
  seri: any;
  judul: any;
  name: any;
  tahun: any;
  buku: any[];

  constructor(
    public _apiService: ApiService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.getBuku();
  }

  ngOnInit() {
    this.cekSesi()
    console.log('cek fungsi halaman event init jalan');
  }

  ionViewDidEnter() {
    console.log("Jika selesai loading");
    this.getBuku();
  }

  //ceksesi untuk mengambil nama user
  async cekSesi() {
    const ambilNama = await Preferences.get({ key: USERNAME });
    if (ambilNama && ambilNama.value) {
      let namauser = ambilNama.value;
      this.nama = namauser;
    }
  }
  //membuat fungsi logout
  logout() {
    this.authService.logout(); // lempar ke authService lalu cari fungsi logout
    this.router.navigateByUrl('/', { replaceUrl: true }); // alihkan ke halama
  }

  getBuku() {
    this._apiService.getBuku().subscribe((res: any) => {
      console.log("Sukses", res);
      this.buku = res;
    }, (error: any) => {
      console.log("gagal", error);
      this.alertController.create({
        header: 'Notifikasi',
        message: 'Gagal memuat data buku',
        buttons: ['OK']
      }).then(res => {
        res.present();
      })
    })
  }

  deleteBuku(id) {
    this.alertController.create({
      header: 'Perhatian',
      subHeader: 'Yakin menghapus data ini?',
      buttons: [
        {
          text: 'Batal',
          handler: (data: any) => {
            console.log('dibatalkan', data);
          }
        },
        {
          text: 'Yakin',
          handler: (data: any) => {
            //jika tekan Yakin
            this._apiService.deleteBuku(id).subscribe((res: any) => {
              console.log("Sukses", res);
              this.getBuku();
            }, (error: any) => {
              console.log("error", error);
              this.alertController.create({
                header: 'Notifikasi',
                message: 'gagal memuat data mahasiswa',
                buttons: ['OK']
              }).then(res => {
                res.present();
              })
            })
          }
        }
      ]
    }).then(res => {
      res.present();
    })
  }

}
