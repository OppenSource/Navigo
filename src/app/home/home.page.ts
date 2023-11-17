import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
