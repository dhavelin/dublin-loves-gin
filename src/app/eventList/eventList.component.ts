import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser'
import { EventsService } from '../events.service';
import * as _ from 'lodash';

@Component({
  selector: 'dh-events',
  templateUrl: './eventList.component.html',
  styleUrls: ['./eventList.component.css']
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

  constructor(
    private eventsService: EventsService,
    private metaService: Meta
  ) {}

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(events => {
      let today = events.today;
      this.events.previous = _.groupBy(_.filter(events.events, (event: any) => {
        return event.start.date < today;
      }), 'start.year');
      this.events.upcoming = _.groupBy(_.filter(events.events, (event: any) => {
        return event.start.date >= today;
      }), 'start.year');
      this.years.previous = _.keys(this.events.previous);
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