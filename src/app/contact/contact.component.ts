import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  e: string = 'dlg' + '@' + 'liquidirish' + '.com';
  mt: string = 'mai' + 'lto:' + this.e;

  constructor() { }

  ngOnInit() {
  }

}
