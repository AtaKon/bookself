import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import { LookUpComponent } from './look-up/look-up.component';
import {BookReaderComponent} from './book-reader/book-reader.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'main', component: MainComponent,canActivate: [AuthGuard] },
  {path:'lookUp',component:LookUpComponent,canActivate: [AuthGuard]},
  {path:'book',component:BookReaderComponent,canActivate: [AuthGuard]},
  {path:'login',component:LoginComponent},
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', redirectTo: 'main', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
