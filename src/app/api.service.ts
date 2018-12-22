import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

  constructor(private httpClient: HttpClient) { }

  calculate(value: string): Observable<Object> {
    return this.httpClient.post<Object>(
      'http://localhost:8000/calc',
      { 'expression': value },
      this.httpOptions);
  }
}
