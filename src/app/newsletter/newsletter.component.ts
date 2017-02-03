import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

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
      content: 'Dublin Loves Gin newsletter'
    });
    this.metaService.addTag({
      name: 'og:url',
      content: 'http://dublinlovesgin.com/newsletter'
    });
    this.metaService.addTag({
      name: 'og:description',
      content: 'Subscribe for notice of upcoming tastings, and for news of what\'s happening in Irish gin'
    });
  }

}
