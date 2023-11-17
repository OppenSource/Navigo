import { DriversPage } from './../views/pages/drivers/drivers.page';
import { CarsPageModule } from './../views/pages/cars/cars.module';
import { MessagesPageModule } from './../views/pages/messages/messages.module';
import { ProfilePageModule } from './../views/pages/profile/profile.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('../views/pages/dashbaord/dashbaord.module').then(m => m.DashbaordPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../views/pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'message',
        loadChildren: () => import('../views/pages/messages/messages.module').then(m => m.MessagesPageModule)
      },
      {
        path: 'cars',
        loadChildren: () => import('../views/pages/cars/cars.module').then(m => m.CarsPageModule)
      },
      {
        path: 'drivers',
        loadChildren: () => import('../views/pages/drivers/drivers.module').then(m => m.DriversPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
