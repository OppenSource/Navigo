import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashbaordPage } from './dashbaord.page';

const routes: Routes = [
  {
    path: '',
    component: DashbaordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashbaordPageRoutingModule {}
