import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public http: HttpClient,
  ) {

  }

  // linkApi
  apiUrl() {
    return "http://localhost/api2";
  }

  getBuku() {
    return this.http.get(this.apiUrl() + '/tampil.php');
  }

  deleteBuku(id) {
    return this.http.delete(this.apiUrl() + '/hapus.php?seri=' + id);
  }

  ambilBuku(id) {
    return this.http.get(this.apiUrl() + '/lihat.php?seri=' + id);
  }
}
