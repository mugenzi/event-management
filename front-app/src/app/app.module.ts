import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventListComponent } from './components/event-list/event-list.component';

import { EventService } from './services/event.service';
import { GuestCreateComponent } from './components/guest-create/guest-create.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { GuestFrontComponent } from './components/guest-front/guest-front.component';

@NgModule({
  declarations: [
    AppComponent,
    EventCreateComponent,
    EventListComponent,
    GuestCreateComponent,
    GuestListComponent,
    GuestFrontComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],


  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
