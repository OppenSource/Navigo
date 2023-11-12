import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: FormGroup | any;
  account: any = {
    username: '',
    password: '',
  };

  constructor(
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.login = this.formBuilder.group({
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  get errorControl() {
    return this.login.controls;
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

  submitForm = () => {
    if (this.login.valid) {
      this.account.username = this.login.value.username;
      this.account.password = this.login.value.password;
      console.log(this.account);
      return false;
    } else {
      this.presentToast();
      return console.log('');
    }
  };
}
