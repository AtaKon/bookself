import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {BookLookUpService} from '../book-look-up.service';

@Component({
  selector: 'app-look-up',
  templateUrl: './look-up.component.html',
  styleUrls: ['./look-up.component.scss']
})
export class LookUpComponent implements OnInit {


    //global object
    book:any;
    subscription!: Subscription;

    foundInfo:any;

  constructor(private lookUpService:BookLookUpService) { }

  ngOnInit(): void {
    this.subscription = this.lookUpService.currentBook.subscribe(book => this.book = book)
    console.log(this.book)
    this.lookUpService.getBookInfo(this.book.title).subscribe(result=>{
      console.log(result.books.items);
      this.foundInfo=result.books.items;
    });
  }

}
