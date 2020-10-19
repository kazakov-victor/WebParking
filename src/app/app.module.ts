import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ContractComponent } from './contract/contract.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AccountantComponent } from './accountant/accountant.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { BodyComponent } from './body/body.component';
import { WrapperComponent } from './wrapper/wrapper.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContractComponent,
    AccountantComponent,
    MenuMainComponent,
    BodyComponent,
    WrapperComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
