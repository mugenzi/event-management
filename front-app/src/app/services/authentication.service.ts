import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { RegisterService } from './register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUri:string = 'http://localhost:4000/event/authentication';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
  constructor(private http : HttpClient, private registerService : RegisterService) { }

  login(data): Observable<boolean> {
    let url = `${this.baseUri}/login`;
    let options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<{token: string}>(url, data, {headers})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
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
