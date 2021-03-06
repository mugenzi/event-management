import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { GuestCreateComponent } from './components/guest-create/guest-create.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-event' },
  { path: 'create-event', component: EventCreateComponent },
  { path: 'edit-event/:id', component: EventEditComponent },
  { path: 'events-list', component: EventListComponent },
  { path: 'create-guest/:id', component : GuestCreateComponent},
  { path: 'guests-list', component: GuestListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




