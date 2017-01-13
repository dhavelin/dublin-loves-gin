import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { EventListComponent } from './eventList/eventList.component';
import { EventsService } from './events.service';
import { AboutComponent } from './about/about.component';
import { EventComponent } from './event/event.component';

const ROUTES = [
  {
    path: '',
    redirectTo: 'events',
    pathMatch: 'full'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'events/:eventId',
    component: EventComponent
  },
  {
    path: 'events',
    component: EventListComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EventListComponent,
    AboutComponent,
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot()
  ],
  providers: [EventsService],
  bootstrap: [AppComponent]
})
export class AppModule { }