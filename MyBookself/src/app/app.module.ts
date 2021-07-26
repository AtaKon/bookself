import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { LookUpComponent } from './look-up/look-up.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BookReaderComponent } from './book-reader/book-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LookUpComponent,
    BookReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
