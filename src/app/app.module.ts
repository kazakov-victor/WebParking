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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { UserComponent } from './user/user.component';
import { OtherComponent } from './other/other.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { ContractEditComponent } from './contract/contract-edit/contract-edit.component';
import { ContractNewComponent } from './contract/contract-new/contract-new.component';
import { AccountrantPaymentComponent } from './accountant/accountrant-payment/accountrant-payment.component';
import { AccountrantCasflowComponent } from './accountant/accountrant-casflow/accountrant-casflow.component';
import { AccountrantReportsComponent } from './accountant/accountrant-reports/accountrant-reports.component';
import { AccountrantTransactionComponent } from './accountant/accountrant-transaction/accountrant-transaction.component';
import { AccountrantMenuComponent } from './accountant/accountrant-menu/accountrant-menu.component';
import { ContractMenuComponent } from './contract/contract-menu/contract-menu.component';
import { PersonSearchComponent } from './person/person-search/person-search.component';
import { PersonNewComponent } from './person/person-new/person-new.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonSelectComponent } from './person/person-select/person-select.component';
import { PersonFilterPipe } from './pipes/person-filter.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContractComponent,
    AccountantComponent,
    MenuMainComponent,
    WrapperComponent,
    UserComponent,
    OtherComponent,
    NotFoundComponent,
    ContractListComponent,
    ContractEditComponent,
    ContractNewComponent,
    AccountrantPaymentComponent,
    AccountrantCasflowComponent,
    AccountrantReportsComponent,
    AccountrantTransactionComponent,
    AccountrantMenuComponent,
    ContractMenuComponent,
    PersonSearchComponent,
    PersonNewComponent,
    PersonEditComponent,
    PersonSelectComponent,
    PersonFilterPipe,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
