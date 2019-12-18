import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  authorize(body) {
    let headers = new HttpHeaders()
    headers.append('Content-Type',  'application/json')
    headers.append('Access-Control-Allow-Origin', 'http://localhost:4200')
    return this.http.post('http://localhost:3000/login', body,{responseType: 'text'})
  }
}
