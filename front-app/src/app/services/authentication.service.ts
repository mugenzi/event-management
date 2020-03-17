import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUri:string = 'http://localhost:4000/event/authentication';
  //baseUri:string = 'http://localhost:4000/event/logout';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private http: HttpClient) { }
  // http://localhost:4000/event/login
  

  // login(data): Observable<any> {
  //   let url = `${this.baseUri}`;
  //   console.log('#################\n');
  //   console.log(`${data.email}\n`);
  //   console.log(`${data.password}\n`);
  //   console.log(`${this.baseUri}\n`);

  //   console.log(url)
  //   return this.http.post(url, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }

  // logout(data): Observable<any> {
  //   let url = `${this.baseUri}`;
  //   return this.http.get(url, data)
  //     .pipe(
  //       catchError(this.errorMgmt)
  //     )
  // }




  login(data): Observable<boolean> {
    let url = `${this.baseUri}/login`;
    return this.http.post<{token: string}>(url, data)
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
