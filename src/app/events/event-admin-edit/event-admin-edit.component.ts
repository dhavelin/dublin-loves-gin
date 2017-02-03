import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Event } from '../event.model';

@Component({
  templateUrl: './event-admin-edit.component.html',
  styleUrls: ['./event-admin-edit.component.css']
})
export class EventAdminEditComponent implements OnInit {

  event: Event;

  constructor(
    private af: AngularFire,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.af.database.list('/events', {
        query: {
          orderByChild: 'id',
          equalTo: params['eventId']
        }
      }))
      .subscribe((events: Event[]) => {
        this.event = events[0];
      });
  }

}