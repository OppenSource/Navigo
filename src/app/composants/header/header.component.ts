import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  formattedDate: any;
  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    const currentDate = new Date();
    this.formattedDate = this.datePipe.transform(
      currentDate,
      'EEEE d MMMM yyyy'
    );
  }
}
