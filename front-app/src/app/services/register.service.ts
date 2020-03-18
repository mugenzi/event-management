import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  baseUri:string = 'http://localhost:4000/event/organizers';
  //baseUri:string = 'http://localhost:4000/event/login';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Create One
  register(data): Observable<any> {
    let url = `${this.baseUri}`;
    return this.http.post(url, data)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // login(data): Observable<any> {
  //   let url = `${this.baseUri}`;
  //   return this.http.post(url, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  login(data): Observable<boolean> {
    let url = `${this.baseUri}/login`;
    const options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    return this.http.post<{token: string}>(url, data, options)
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  // Get all organizer
  findAllOrganizer() {
    return this.http.get(`${this.baseUri}`);
  }

  // Get logged user
  getLoggedUser(email) {
    return this.http.get(`${this.baseUri}/${email}`);
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
