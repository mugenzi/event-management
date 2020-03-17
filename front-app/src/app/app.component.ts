import { Component } from '@angular/core'; 
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-app';

  constructor(private authentication: AuthenticationService, private router: Router) { }

  logout() {
    this.authentication.logout();
    this.router.navigate(['login']);
  }

}
 