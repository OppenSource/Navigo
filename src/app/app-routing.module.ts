import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./views/common/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./views/common/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./views/common/reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./views/common/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },  {
    path: 'drivers',
    loadChildren: () => import('./views/pages/drivers/drivers.module').then( m => m.DriversPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./views/pages/messages/messages.module').then( m => m.MessagesPageModule)
  },
  {
    path: 'cars',
    loadChildren: () => import('./views/pages/cars/cars.module').then( m => m.CarsPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./views/pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'dashbaord',
    loadChildren: () => import('./views/pages/dashbaord/dashbaord.module').then( m => m.DashbaordPageModule)
  },
  {
    path: 'cars-details',
    loadChildren: () => import('./views/pages/cars-details/cars-details.module').then( m => m.CarsDetailsPageModule)
  },
  {
    path: 'etudiant',
    loadChildren: () => import('./views/test/etudiant/etudiant.module').then( m => m.EtudiantPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
