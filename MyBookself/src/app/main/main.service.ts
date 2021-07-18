import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http:HttpClient) { }

  getBooksMain()
  {
    return this.http.get<any>('http://localhost:3000/api/books/');
  }
}
