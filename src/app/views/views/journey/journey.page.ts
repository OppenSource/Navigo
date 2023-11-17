import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-journey',
  templateUrl: './journey.page.html',
  styleUrls: ['./journey.page.scss'],
})
export class JourneyPage implements OnInit {
  selected: any = 'list';
  login: FormGroup | any;

  constructor() { }

  ngOnInit() {
  }

}
