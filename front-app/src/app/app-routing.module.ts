import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { GuestCreateComponent } from './components/guest-create/guest-create.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { AppFrontComponent } from './components/app-front/app-front.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app-app-front' },
  { path: 'create-event', component: EventCreateComponent, canActivate: [AuthenticationGuard] },
  { path: 'edit-event/:id', component: EventEditComponent, canActivate: [AuthenticationGuard] },
  { path: 'events-list', component: EventListComponent, canActivate: [AuthenticationGuard] },
  { path: 'create-guest/:id', component : GuestCreateComponent, canActivate: [AuthenticationGuard]},
  { path: 'guests-list', component: GuestListComponent, canActivate: [AuthenticationGuard] },
  { path: 'edit-update/:id', component: EventEditComponent, canActivate: [AuthenticationGuard] },
  { path: 'organizer-register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: '', component:AppFrontComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




