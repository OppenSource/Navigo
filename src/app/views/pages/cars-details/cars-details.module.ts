import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CarsDetailsPageRoutingModule } from './cars-details-routing.module';

import { CarsDetailsPage } from './cars-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CarsDetailsPageRoutingModule
  ],
  declarations: [CarsDetailsPage]
})
export class CarsDetailsPageModule {}
