import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from "rxjs";
import "rxjs/add/operator/take";
import * as _ from 'lodash';

import { Event } from '../event.model';

@Component({
  templateUrl: './event-admin-list.component.html',
  styleUrls: ['./event-admin-list.component.css']
})
export class EventAdminListComponent implements OnInit {

  events: {
    previous: Event[],
    upcoming: Event[]
  };

  constructor(
    private af: AngularFire
  ) {}

  ngOnInit() {
    this.events = {
      previous: [],
      upcoming: []
    };
    this.af.database.list('/events').take(1).subscribe((events: Event[]) => {

      let today = new Date().toJSON().slice(0, 10);

      this.events.previous = _.filter(events, (event: Event) => {
        return event.start.date < today;
      });

      this.events.upcoming = _.filter(events, (event: Event) => {
        return event.start.date >= today;
      });

    });
  }

}