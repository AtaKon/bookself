import { Component, OnInit } from '@angular/core';
import {MainService} from './main.service';
import {BookLookUpService} from '../book-look-up.service';
import { Router } from '@angular/router';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
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
      this.books.forEach((element: { imageLink: string; }) => {
        if(element.imageLink !== undefined && element.imageLink !== null){
          element.imageLink=element.imageLink.replace("zoom=1","zoom=2")
        }
      });
    });
  }

  lookUp(book:any){
    console.log(book)
    this.lookUpService.changeBook(book);
    this.router.navigate(['/lookUp']);
  }

  addToFavorites(id:any){
    let obj={id:id}
    this.lookUpService.addToFavorites(obj).subscribe(result=>{
      console.log(result);
    });
  }

  readBook(id:string)
  {
    this.mainService.changeBook(id);
    this.router.navigate(['book']);
  }

}
