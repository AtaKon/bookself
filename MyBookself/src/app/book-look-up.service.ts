import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookLookUpService {

  private book=new BehaviorSubject(null);
  currentBook=this.book.asObservable();

  constructor(private http:HttpClient) { }

  changeBook(book:any){
    this.book.next(book);
  }

  getBookInfo(title:any)
  {
    return this.http.get<any>('http://localhost:3000/api/books/getInfo/'+title);
  }

}
