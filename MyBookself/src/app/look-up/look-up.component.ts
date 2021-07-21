import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {BookLookUpService} from '../book-look-up.service';
import { Router } from '@angular/router';

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

  constructor(private lookUpService:BookLookUpService,private router:Router) { }

  ngOnInit(): void {
    this.subscription = this.lookUpService.currentBook.subscribe(book => this.book = book)
    console.log(this.book)
    this.lookUpService.getBookInfo(this.book.title).subscribe(result=>{
      console.log(result.books.items);
      this.foundInfo=result.books.items;
    });
  }


  setBookInfo(info:any,book:any)
  {
    let obj={info:info,bookId:book._id}
    this.lookUpService.setBookInfo(obj).subscribe(result=>{
      this.router.navigate(['/main'])
    });
  }

}
