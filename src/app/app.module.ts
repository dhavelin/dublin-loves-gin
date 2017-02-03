import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MaterialModule, MdIconModule, MdIconRegistry } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AppComponent } from './app.component';
import { EventComponent } from './events/event-view/event-view.component';
import { EventListComponent } from './events/event-list/event-list.component';
import { EventAdminListComponent } from './events/event-admin-list/event-admin-list.component';
import { NewsletterComponent } from './newsletter/newsletter.component';

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
  },
  {
    path: 'newsletter',
    component: NewsletterComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'admin/events',
    component: EventAdminListComponent
  }
];

export const firebaseConfig = {
  apiKey: "AIzaSyCvu7FW5CGEP9EIEPopZfMq8wfejT4cYnI",
  authDomain: "dublinlovesgin.firebaseapp.com",
  databaseURL: "https://dublinlovesgin.firebaseio.com",
  storageBucket: "dublinlovesgin.appspot.com",
  messagingSenderId: "307428306218"
};

@NgModule({
  declarations: [
    AboutComponent,
    AppComponent,
    ContactComponent,
    EventComponent,
    EventAdminListComponent,
    EventListComponent,
    NewsletterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
   constructor(mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.setDefaultFontSetClass('fa');
  }
}
