import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from './main/main.component';
import { LookUpComponent } from './look-up/look-up.component';

const routes: Routes = [
  { path: 'main', component: MainComponent },
  {path:'lookUp',component:LookUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
