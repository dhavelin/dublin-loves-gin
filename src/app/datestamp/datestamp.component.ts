import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'dh-datestamp',
  templateUrl: './datestamp.component.html',
  styleUrls: ['./datestamp.component.less']
})
export class DatestampComponent implements OnInit {

  start: any = {
    year: '2016',
    month: 'Jan',
    date: '20',
    day: 'Mon'
  };

  constructor() { }

  ngOnInit() {
  }

}
