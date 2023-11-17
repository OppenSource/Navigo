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
    path: 'message',
    loadChildren: () => import('./views/views/message/message.module').then( m => m.MessagePageModule)
  },
  {
    path: 'driver',
    loadChildren: () => import('./views/views/driver/driver.module').then( m => m.DriverPageModule)
  },
  {
    path: 'bus',
    loadChildren: () => import('./views/views/bus/bus.module').then( m => m.BusPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./views/views/student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'journey',
    loadChildren: () => import('./views/views/journey/journey.module').then( m => m.JourneyPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./views/administration/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./views/settings/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'statistics',
    loadChildren: () => import('./views/settings/statistics/statistics.module').then( m => m.StatisticsPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
