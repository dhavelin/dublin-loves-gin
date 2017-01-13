import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { EventsService, Event } from '../events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  event: Event;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.eventsService.getEvent(params['eventId']))
      .subscribe((event: Event) => this.event = event);
  }

}
