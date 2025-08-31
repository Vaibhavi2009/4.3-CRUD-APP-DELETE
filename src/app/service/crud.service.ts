import { Injectable } from '@angular/core';
import { Book } from './Book';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  // Get all books
  GetBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(`${this.REST_API}`)
      .pipe(catchError(this.handleError));
  }

  // Add
  AddBook(data: Book): Observable<any> {
    const API_URL = `${this.REST_API}/add-book`; // <-- backticks!
    return this.httpClient.post(API_URL, data, { headers: this.httpHeaders })
      .pipe(catchError(this.handleError));
  }

  // Delete
DeleteBook(id: any): Observable<any> {
let API_URL = `${this.REST_API}/delete-book/${id}`;
return this.httpClient.delete(API_URL, { headers: this.httpHeaders })
.pipe(
catchError(this.handleError)
);
}
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  }
}
