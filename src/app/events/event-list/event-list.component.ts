import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';

import { Event } from '../event.model';

@Component({
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  years: any = {
    previous: [],
    upcoming: []
  };

  events: any = {
    previous: {},
    upcoming: {}
  };

  items: Observable<any[]>;

  constructor(
    private af: AngularFire,
    private metaService: Meta
  ) {}

  ngOnInit() {

    this.af.database.list('/events', {
      query: {
        orderByChild: 'id'
      }
    }).take(1).subscribe((events: Event[]) => {
      let today = new Date().toJSON().slice(0, 10);
      this.events.previous = _.groupBy(_.orderBy(_.filter(events, (event: Event) => {
        return event.start.date < today;
      }), ['start.date'], ['desc']), 'start.year');
      this.events.upcoming = _.groupBy(_.orderBy(_.filter(events, (event: Event) => {
        return event.start.date >= today;
      }), ['start.date'], ['asc']), 'start.year');
      this.years.previous = _.orderBy(_.keys(this.events.previous), [], 'desc');
      this.years.upcoming = _.keys(this.events.upcoming);

      this.metaService.removeTag('name="og:title"');
      this.metaService.removeTag('name="og:image"');
      this.metaService.removeTag('name="og:url"');
      this.metaService.removeTag('name="og:description"');
      this.metaService.addTag({
        name: 'og:title',
        content: 'Dublin Loves Gin events'
      });
      this.metaService.addTag({
        name: 'og:url',
        content: 'http://dublinlovesgin.com/events'
      });
      this.metaService.addTag({
        name: 'og:description',
        content: 'Dublin Loves Gin events, upcoming and previous'
      });
    });

  }

}
