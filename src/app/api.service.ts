import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    })
  };

  url = 'http://localhost:8000/calc';

  constructor(private httpClient: HttpClient) { }

  calculate(value: string): Observable<Data> {
    return this.httpClient.post<Data>(
      this.url,
      `expression=${value}`,
      this.httpOptions
    );
  }
}
