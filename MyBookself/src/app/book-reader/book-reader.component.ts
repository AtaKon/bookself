import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {MainService} from '../main/main.service';

@Component({
  selector: 'app-book-reader',
  templateUrl: './book-reader.component.html',
  styleUrls: ['./book-reader.component.scss']
})
export class BookReaderComponent implements OnInit {
  pdfSrc:any;
  file:any;

  message!:string;
  subscription!: Subscription;


  constructor(private mainService:MainService) { }



  ngOnInit(): void {
    this.subscription = this.mainService.currentBook.subscribe(message => this.message = message)
    this.mainService.getBook(this.message).subscribe(result=>{
      let reader = new FileReader();

      reader.onload = (e: any) => {
       this.pdfSrc = e.target.result;
     };

     reader.readAsArrayBuffer(result);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
