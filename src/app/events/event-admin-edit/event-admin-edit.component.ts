import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import * as _ from 'lodash';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Event } from '../event.model';

@Component({
  templateUrl: './event-admin-edit.component.html',
  styleUrls: ['./event-admin-edit.component.css']
})
export class EventAdminEditComponent implements OnInit {

  form: FormGroup;
  samples: FormArray;
  event: Event;

  "start": {
    "date": "2016-11-16",
    "time": "19:00",
    "dayOfWeek": "Wednesday",
    "day": "16",
    "month": "November",
    "year": "2016"
  }

  formatMonth(index: number): string {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return monthNames[index];
  }

  formatDayOfWeek(index: number): string {
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    return dayNames[index];
  }

  formatDay(day: number): string {
    return ('00' + day).slice(-2);
  }

  constructor(
    private af: AngularFire,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required],
      start: this.fb.group({
        time: ['', Validators.required],
        date: ['', Validators.required],
        // The following properties are all calculated from date
        dayOfWeek: '',
        day: '',
        month: '',
        year: ''
      }),
      tickets: ['', Validators.required],
      image: '',
      description: ['', Validators.required],
      samples: this.buildArray(),
    });
  }

  subcribeToDateChanges() {

    const dateChanges = this.form.get('start').get('date').valueChanges;

    dateChanges.subscribe(newDate => {
      const d = new Date(newDate);
      this.form.get('start').get('year').setValue('' + d.getFullYear());
      this.form.get('start').get('day').setValue(this.formatDay(d.getDate()));
      this.form.get('start').get('month').setValue(this.formatMonth(d.getMonth()));
      this.form.get('start').get('dayOfWeek').setValue(this.formatDayOfWeek(d.getDay()));
    });

 }

  ngOnInit() {
    this.subcribeToDateChanges();
    this.route.params
      .switchMap((params: Params) => this.af.database.list('/events', {
        query: {
          orderByChild: 'id',
          equalTo: params['eventId']
        }
      }))
      .subscribe((events: Event[]) => {
        this.event = events[0];
        this.form.patchValue(_.omit(this.event, ['samples']));
        this.event.samples.forEach(sample => {
          this.addSample(sample);
        });
      });
  }

  onSubmit() {
    console.log('SUBMIT');
    console.log(this.form.value);
  }

  buildArray(): FormArray {
    this.samples = this.fb.array([]);
    return this.samples;
  }

  buildGroup(sample): FormGroup {
    return this.fb.group(sample);
  }

  addNewSample() {
    this.samples.push(this.buildGroup({
      title: '',
      distillery: '',
      description: '',
      abv: '',
      url: ''
    }));
  }

  addSample(sample) {
    this.samples.push(this.buildGroup(sample));
  }

}