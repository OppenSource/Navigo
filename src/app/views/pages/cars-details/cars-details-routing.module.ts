import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CarsDetailsPage } from './cars-details.page';

const routes: Routes = [
  {
    path: '',
    component: CarsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarsDetailsPageRoutingModule {}
