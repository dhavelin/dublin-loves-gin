import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

export class Event {
  id: string;
  title: string;
  location: string;
  start: {
    date: string,
    time: string;
    dayOfWeek: string;
    day: string;
    month: string;
    year: string;
  };
  tickets: string;
  samples: any[];
}

@Injectable()
export class EventsService {

  constructor(private http: Http) { }

  getAllEvents() {
    return this.http.get('/api/events')
      .map(res => res.json());
  }

  getEvent(id: string) {
    return this.http.get('/api/events/' + id)
      .map(res => res.json());
  }

}
