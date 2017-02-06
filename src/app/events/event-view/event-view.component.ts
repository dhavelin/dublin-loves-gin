import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Event } from '../event.model';

@Component({
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.css']
})
export class EventComponent implements OnInit {

  event: Event;

  constructor(
    private af: AngularFire,
    private route: ActivatedRoute,
    private router: Router,
    private metaService: Meta
  ) {}

  ngOnInit() {

    this.route.params
      .switchMap((params: Params) => this.af.database.object(`/events/${params['eventId']}`))
      .subscribe((event: Event) => {
        this.event = event;

        this.metaService.removeTag('name="og:title"');
        this.metaService.removeTag('name="og:image"');
        this.metaService.removeTag('name="og:url"');
        this.metaService.removeTag('name="og:description"');
        this.metaService.addTag({
          name: 'og:title',
          content: this.event.title
        });
        this.metaService.addTag({
          name: 'og:image',
          content: 'http://dublinlovesgin.com/assets/images/' + this.event.image
        });
        this.metaService.addTag({
          name: 'og:url',
          content: 'http://dublinlovesgin.com/events/' + this.event.id
        });
        this.metaService.addTag({
          name: 'og:description',
          content: 'Please join us to sample some delicious gins on '
                   + this.event.start.dayOfWeek + ', '
                   + this.event.start.day + ' ' + this.event.start.month + ', ' + this.event.start.year + ' at '
                   + this.event.location
        });
      });

  }

}
