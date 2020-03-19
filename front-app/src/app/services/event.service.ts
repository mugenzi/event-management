import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class EventService {

  baseUri:string = 'http://localhost:4000/events'; 
  
  token = localStorage.getItem('access_token')
  myJWTHeaders = {
    headers: {
      "Content-Type":  "application/json",
      "x-access-token": this.token
    }
  }
  

  constructor(private http: HttpClient) { }

  // CREATE EVENT
  createEvent(data): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data, this.myJWTHeaders)
      .pipe(
        catchError(this.errorMgmt)
      )
  }

  // Get all events
  getEvents() {
    return this.http.get(`${this.baseUri}`, this.myJWTHeaders);
  }

  // Get event
  getEvent(id): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, this.myJWTHeaders).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // UPDATE EVENT
  updateEvent(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, this.myJWTHeaders).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete event
  deleteEvent(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, this.myJWTHeaders).pipe(
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

