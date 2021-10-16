import { Component, OnInit } from '@angular/core';
import {MainService} from './main.service';
import {BookLookUpService} from '../book-look-up.service';
import { Router } from '@angular/router';
import {PageEvent} from '@angular/material/paginator';

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
  description=false;
  retOfBooks:any;
  pageSizeOptions: number[] = [21, 42, 84, 108];
  pageSize?:number;
  length?:number;

  // MatPaginator Output
  pageEvent?: PageEvent;

  imagePlaceholder:string="https://books.google.com/books/content?id=YemUDwAAQBAJ&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api";

  ngOnInit(): void {
    this.getBooks()

  }

  public getBooks(event?:PageEvent){

    this.mainService.getBooksMain(event).subscribe(result=>{
      console.log(result)
      this.length=result.books.totalDocs
      this.pageSize=result.books.limit
      this.books=result.books.docs;
      this.books.forEach((element: { imageLink: string; }) => {
        if(element.imageLink !== undefined && element.imageLink !== null){
          element.imageLink=element.imageLink.replace("zoom=1","zoom=2")
          element.imageLink=element.imageLink.replace("http","https")
        }
      });
    });
    return event;
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


  descriptionShortener(input:string)
  {
    if(!input){
      return ''
    }
    var n = input.split(" ");
    if(n.length>40)
    {
      return n.slice(0,39).join(' ')+' ...';
    }else{
      return input
    }
  }

  readBook(id:string)
  {
    this.mainService.changeBook(id);
    this.router.navigate(['book']);
  }
  toogleDescription()
  {
    this.description=true;
    console.log("test")
  }
  toogleDescriptionOff()
  {
    this.description=false;
  }
}
