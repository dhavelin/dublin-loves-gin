export class Event {

  id: string;
  title: string;
  location: string;
  image: string;
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

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
