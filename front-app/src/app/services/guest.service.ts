import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class GuestService {

  baseUri:string = 'http://localhost:4000/guests';
 
  token = localStorage.getItem('access_token')
  myJWTHeaders = {
    headers: {
      "Content-Type":  "application/json", 
      "x-access-token": this.token
    }
  }

  constructor(private http: HttpClient) { }

  // CREATE A GUEST
  createGuest(data, id): Observable<any> {
    let url = `${this.baseUri}/create/${id}`;
    return this.http.post(url, data, this.myJWTHeaders)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // GET ALL GUESTS
  getGuests() {
    const myJWTHeaders = {
      headers: {
        "Content-Type":  "application/json",
        "responseType": 'text',
        "x-access-token": this.token
      }
    }
    return this.http.get(`${this.baseUri}`, myJWTHeaders);
  }

  // Get GUEST
  getGuest(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, this.myJWTHeaders).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update event
  updateGuest(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, this.myJWTHeaders).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete event
  deleteGuest(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, this.myJWTHeaders).pipe(
      catchError(this.errorMgmt)
    )
  }

  guestConfirmation(eventId, guestId, status): Observable<any> {
    let url = `${this.baseUri}/guest/${guestId}/event/${eventId}/status/${status}`;
     
    return this.http.post(url, this.myJWTHeaders)
      .pipe(
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

