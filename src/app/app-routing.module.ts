import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutoLoginGuard } from './guards/auto-login.guard';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./buku/buku.module').then(m => m.BukuPageModule),
    canLoad: [AuthGuard] // Secure all child pages
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m =>
      m.LoginPageModule),
    canLoad: [AutoLoginGuard]
  },
  {
    path: 'buku',
    loadChildren: () => import('./buku/buku.module').then(m => m.BukuPageModule),
    canLoad: [AuthGuard] // Secure all child pages

  },
  {
    path: 'buku-tambah',
    loadChildren: () => import('./buku-tambah/buku-tambah.module').then(m => m.BukuTambahPageModule)
  },
  {
    path: 'buku-edit/:seri',
    loadChildren: () => import('./buku-edit/buku-edit.module').then(m => m.BukuEditPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }