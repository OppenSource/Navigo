import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register: FormGroup | any;
  account: any = {
    email: '',
    phone: '',
    fullname: '',
    username: '',
    password: '',
    account: '',
  };

  constructor(
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    public navCtrl: NavController
  ) {}

  ngOnInit() {
    this.register = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@institutsaintjean+.org$'),
        ],
      ],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20),
        ],
      ],
      phone: [
        '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(6),
          Validators.pattern(/^6/),
        ],
      ],
      fullname: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
      confirmPassword: ['', [Validators.required]],
      account: ['', [Validators.required]],
    });
  }

  get errorControl() {
    return this.register.controls;
  }

  passwordMatchValidator(password: any, confirmPassword: any) {
    if (password === confirmPassword) {
      return true;
    } else {
      return false;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Renseignez tous les champs avant de continuer.',
      duration: 3000,
      color: 'danger',
      icon: 'alert-circle-outline',
      position: 'bottom',
    });
    await toast.present();
  }

  async passwordToast() {
    const toast = await this.toastController.create({
      message: 'Les mots de passe ne sont pas identiques.',
      duration: 5000,
      color: 'warning',
      icon: 'warning-outline',
      position: 'bottom',
    });
    await toast.present();
  }

  async successRegistration() {
    const toast = await this.toastController.create({
      message: 'Le compte a été créer avec succès.',
      duration: 5000,
      color: 'success',
      icon: 'happy-outline',
      position: 'top',
    });
    await toast.present();
  }

  submitForm = () => {
    if (this.register.valid) {
      let result = (this.account.email = this.register.value.email);
      if (
        this.passwordMatchValidator(
          this.register.value.password,
          this.register.value.confirmPassword
        )
      ) {
        this.account.phone = this.register.value.phone;
        this.account.fullname = this.register.value.fullname;
        this.account.username = this.register.value.username;
        this.account.password = this.register.value.password;
        this.account.account = this.register.value.account;
        setTimeout(() => {
          this.successRegistration();
          this.navCtrl.navigateForward('login');
        }, 1000);
      } else {
        this.passwordToast();
      }
      console.log(this.account);
      return false;
    } else {
      this.presentToast();
      return '';
    }
  };
}
