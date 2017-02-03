import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
@Component({
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  e: string = 'dlg' + '@' + 'liquidirish' + '.com';
  mt: string = 'mai' + 'lto:' + this.e;

  constructor(
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.metaService.removeTag('name="og:title"');
    this.metaService.removeTag('name="og:image"');
    this.metaService.removeTag('name="og:url"');
    this.metaService.removeTag('name="og:description"');
    this.metaService.addTag({
      name: 'og:title',
      content: 'Contact Dublin Loves Gin'
    });
    this.metaService.addTag({
      name: 'og:url',
      content: 'http://dublinlovesgin.com/contact'
    });
    this.metaService.addTag({
      name: 'og:description',
      content: 'Contact Dublin Loves Gin via Twitter or email'
    });
  }

}
