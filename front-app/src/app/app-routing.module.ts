import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventCreateComponent } from './components/event-create/event-create.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { GuestCreateComponent } from './components/guest-create/guest-create.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

// import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './guards/authentication.guard';

// const routes: Routes = [
//   { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
//   { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
//   { path: 'login', component: LoginComponent},

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'create-event' },
  { path: 'create-event', component: EventCreateComponent },
  { path: 'edit-event/:id', component: EventEditComponent },
  { path: 'events-list', component: EventListComponent },
  { path: 'create-guest', component : GuestCreateComponent},
  { path: 'guests-list', component: GuestListComponent },
  { path: 'organizer-register', component: RegisterComponent, canActivate: [AuthenticationGuard]},
  { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }




