import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';
import { Network } from '@capacitor/network';
import { PluginListenerHandle } from '@capacitor/core';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  networkStatus: any;
  networkListener: PluginListenerHandle | undefined;
  login: FormGroup | any;
  account: any = {
    username: '',
    password: '',
  };
  connected: any;
  code: any;

  constructor(
    public formBuilder: FormBuilder,
    private toastController: ToastController,
    public navCtrl: NavController,
    private translate: TranslateService,
  ) {
    this.translate.setDefaultLang('en');
  }

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
    this.initializeApp();

    this.getCodeLanguage();
  }

  async getCodeLanguage() {
    const info = await Device.getLanguageCode();
    this.code = info.value;
    this.translate.use(this.code);
    console.log(this.code);
  }

  get errorControl() {
    return this.login.controls;
  }

  async successLogin() {
    const toast = await this.toastController.create({
      message: 'Connexion établie avec succès.',
      duration: 5000,
      color: 'success',
      icon: 'happy-outline',
      position: 'top',
    });
    await toast.present();
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

      setTimeout(() => {
        this.successLogin();
        this.navCtrl.navigateForward('home');
      }, 1000);
    } else {
      this.presentToast();
      return console.log('');
    }
  };

  async initializeApp() {
    this.networkListener = Network.addListener(
      'networkStatusChange',
      (status) => {
        console.log('Network status changed', status);
        this.connected = status.connected;
        if (status.connected == false) {
          this.LosingConnetion();
          this.connected = false;
        } else {
          this.GreatConnetion();
          this.connected = true;
        }
      }
    );
  }

  async LosingConnetion() {
    const toast = await this.toastController.create({
      message: 'Connexion Internet perdue.',
      duration: 3500,
      icon: 'planet-outline',
      color: 'danger',
      position: 'top',
    });

    await toast.present();
  }

  async GreatConnetion() {
    const toast = await this.toastController.create({
      message: 'Connexion à internet réétablie.',
      duration: 3500,
      icon: 'wifi-outline',
      color: 'success',
      position: 'top',
    });

    await toast.present();
  }
}
