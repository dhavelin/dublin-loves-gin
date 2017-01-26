import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta } from '@angular/platform-browser'
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
    private metaService: Meta,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.eventsService.getEvent(params['eventId']))
      .subscribe((event: Event) => {
        this.event = event;

        this.metaService.removeTag('name="og:title"');
        this.metaService.removeTag('name="og:image"');
        this.metaService.removeTag('name="og:url"');
        this.metaService.removeTag('name="og:description"');
        this.metaService.addTag({
          name: 'og:title',
          content: event.title
        });
        this.metaService.addTag({
          name: 'og:image',
          content: 'http://dublinlovesgin.com/assets/images/' + event.image
        });
        this.metaService.addTag({
          name: 'og:url',
          content: 'http://dublinlovesgin.com/events/' + event.id
        });
        this.metaService.addTag({
          name: 'og:description',
          content: 'Please join us to sample some delicious gins on '
                   + event.start.dayOfWeek + ', '
                   + event.start.day + ' ' + event.start.month + ', ' + event.start.year + ' at '
                   + event.location
        });

      });
  }

}