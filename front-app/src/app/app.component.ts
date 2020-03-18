import { Component,OnInit, OnChanges  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { HttpHeaders, HttpClient } from '@angular/common/http'; 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit, OnChanges {
  title = 'front-app';

  userDisplayName = '';
    ngOnInit() {
      this.displayLoggerName();
    }

    displayLoggerName() {
      let fullname = localStorage.getItem('logged-user');
      if(fullname){
        this.userDisplayName = `Welcome ${fullname}`;
      }
    }

  constructor(private authentication: AuthenticationService, 
    private router: Router, 
    private http: HttpClient) 
    { }

  isLoggedIn(){return this.authentication.loggedIn;};

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.displayLoggerName();
  }

  logout() {
    this.authentication.logout();
    this.displayLoggerName();
    this.router.navigate(['login']);
  }

}
