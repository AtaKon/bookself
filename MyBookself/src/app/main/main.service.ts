import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private bookSource = new BehaviorSubject('');
  currentBook = this.bookSource.asObservable();

  constructor(private http:HttpClient) { }

  getBooksMain()
  {
    return this.http.get<any>('http://localhost:3000/api/books/');
  }

  getBook(id:string)
  {
    const httpOptions = {
      responseType: 'blob' as 'json'};
    return this.http.get<any>('http://localhost:3000/api/books/getBook/'+id,httpOptions);
  }

  changeBook(id:string)
  {
    this.bookSource.next(id)
  }
}
