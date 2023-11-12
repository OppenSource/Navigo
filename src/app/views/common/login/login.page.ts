import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup | any;
  account: any =  {
    username: '',
    password: ''
  };

  constructor( public formBuilder: FormBuilder, private toastController: ToastController, public navCtrl  : NavController) { }

  ngOnInit() {
  }

}
