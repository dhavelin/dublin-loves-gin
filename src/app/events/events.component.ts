import { Component, OnInit } from '@angular/core';
import { EventsService } from '../events.service';
import * as _ from 'lodash';

@Component({
  selector: 'dh-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  years: any = {
    previous: [],
    upcoming: []
  };

  events: any = {
    previous: {},
    upcoming: {}
  };

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.eventsService.getAllEvents().subscribe(events => {
      let today = events.today;
      this.events.previous = _.groupBy(_.filter(events.events, (event: any) => {
        return event.start.date < today;
      }), 'start.year');
      this.events.upcoming = _.groupBy(_.filter(events.events, (event: any) => {
        return event.start.date >= today;
      }), 'start.year');
      console.log(this.events.previous);
      this.years.previous = _.keys(this.events.previous);
      this.years.upcoming = _.keys(this.events.upcoming);
      console.log(this.years.previous);
    });
  }

}