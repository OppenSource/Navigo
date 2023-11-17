import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JourneyPage } from './journey.page';

const routes: Routes = [
  {
    path: '',
    component: JourneyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JourneyPageRoutingModule {}
