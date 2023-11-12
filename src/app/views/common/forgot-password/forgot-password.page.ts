import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgot: FormGroup | any;
  account: any = {
    account: '',
  };

  constructor(
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.forgot = this.formBuilder.group({
      account: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.forgot.controls;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Renseignez tous les champs avant de continuer.',
      duration: 5000,
      color: 'danger',
      icon: 'alert-circle-outline',
      position: 'top',
    });
    await toast.present();
  }

  async successLogin() {
    const toast = await this.toastController.create({
      message:
        'Mot de passe réinitialisé avec succès, veillez consulter votre messagérie téléphonique.',
      duration: 4000,
      color: 'success',
      icon: 'checkmark-done-circle-outline',
      position: 'top',
    });
    await toast.present();
  }

  submitForm = () => {
    if (this.forgot.valid) {
      this.account.account = this.forgot.value.account;
      setTimeout(() => {
        this.successLogin();
        this.navCtrl.navigateForward('login');
      }, 1000);

      return false;
    } else {
      this.presentToast();
      return console.log('');
    }
  };
}
