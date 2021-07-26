import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import { LookUpComponent } from './look-up/look-up.component';
import {BookReaderComponent} from './book-reader/book-reader.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  {path:'lookUp',component:LookUpComponent},
  {path:'book',component:BookReaderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
