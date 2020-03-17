import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  baseUri: string = 'http://localhost:4000/event/organizers';
  //http://localhost:4000/event/organizers/email/habibu@gmail.com
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create One
  register(data): Observable<any> {
    let url = `${this.baseUri}`;
    return this.http.get(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all organizer
  findAllOrganizer() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get logged user
  getLoggedUser(email) {
    let user = null;
    //localStorage.setItem('logged_user', email);
    //headers: req.headers.set('Authorization', `Bearer ${token}`)
    //let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    let token = localStorage.getItem('access_token')
    let headers = new HttpHeaders().set('x-access-token',  `Bearer ${token}`);

    this.http.get(`${this.baseUri}/email/${email}`, {headers}).subscribe((result) => {
      console.log(result)
      // localStorage.setItem('logged_user', result.toString());
      // user = result;
    });
    return user;
  }

  // Delete Guest
  changePassword(email): Observable<any> {
    let url = `${this.baseUri}/changepassword/${email}`;
    return this.http.post(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
