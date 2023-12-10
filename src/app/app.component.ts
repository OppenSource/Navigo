import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { register } from 'swiper/element/bundle';
import { FcmService } from './RestService/Fonctions/Fcm/fcm.service';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  async toggleTheme(event: any) {
    if (event.detail.checked) {
      document.body.setAttribute('colo-theme', 'dark')
    }
    else {
      document.body.setAttribute('colo-theme', 'light')
    }
  }
  constructor(private fcm: FcmService, private plateform : Platform, private translate: TranslateService) {
    this.plateform.ready().then(() => {
      this.translate.use('en');
      this.fcm.initPush();
    }).catch(e => {
      console.log('error fcm: ', e);
    });
  }


}
