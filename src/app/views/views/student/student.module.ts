import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { StudentPageRoutingModule } from './student-routing.module';
import { StudentPage } from './student.page';
import { Storage } from '@ionic/storage-angular';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentPageRoutingModule,
    ReactiveFormsModule,
    QRCodeModule,
  ],
  declarations: [StudentPage],
  providers: [Storage],
})
export class StudentPageModule {}
