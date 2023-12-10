import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertConfirmationService {

  constructor(
    private alertCtrl: AlertController,
  ) { }

  
}
