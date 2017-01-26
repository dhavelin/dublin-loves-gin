import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

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
      content: 'About Dublin Loves Gin'
    });
    this.metaService.addTag({
      name: 'og:url',
      content: 'http://dublinlovesgin.com/about'
    });
    this.metaService.addTag({
      name: 'og:description',
      content: 'Dublin Loves Gin is a monthly gathering for gin enthusiasts'
    });
  }

}
