import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashbaordPageRoutingModule } from './dashbaord-routing.module';

import { DashbaordPage } from './dashbaord.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashbaordPageRoutingModule
  ],
  declarations: [DashbaordPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashbaordPageModule {}
