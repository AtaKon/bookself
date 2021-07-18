import { Component, OnInit } from '@angular/core';
import {MainService} from './main.service';
import {BookLookUpService} from '../book-look-up.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(private mainService:MainService,
    private lookUpService:BookLookUpService,
    private router:Router) { }

  books:any;
  imagePlaceholder:string="https://books.google.com/books/content?id=YemUDwAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api";

  ngOnInit(): void {
    this.mainService.getBooksMain().subscribe(result=>{
      this.books=result.books;
      console.log(result.books);
    });
  }

  lookUp(book:any){
    console.log(book)
    this.lookUpService.changeBook(book);
    this.router.navigate(['/lookUp']);
  }

}
