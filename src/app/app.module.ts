import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeaderComponent } from './header/header.component';
import { DestinationSearchComponent } from './destination-search/destination-search.component';
import { DestinationSummaryComponent } from './destination-summary/destination-summary.component';
import { PageNotFoundComponent } from './not-found.component';

import { DestinationService } from './model/destination.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DestinationSearchComponent,
    DestinationSummaryComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [DestinationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
