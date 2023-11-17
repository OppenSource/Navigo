import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EtudiantPageRoutingModule } from './etudiant-routing.module';

import { EtudiantPage } from './etudiant.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EtudiantPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [EtudiantPage]
})
export class EtudiantPageModule {}
