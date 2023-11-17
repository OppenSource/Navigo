import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
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
  constructor() {}
}
