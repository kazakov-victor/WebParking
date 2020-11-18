import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonReportComponent } from './common-report/common-report.component';
import { ContractComponent } from './contract/contract.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AccountantComponent } from './accountant/accountant.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { UserComponent } from './start/user/user.component';
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
import { PersonSearchComponent } from './persons/person-search/person-search.component';
import { PersonNewComponent } from './persons/person-new/person-new.component';
import { PersonEditComponent } from './persons/person-edit/person-edit.component';
import { PersonSelectComponent } from './persons/person-select/person-select.component';
import { PersonFilterPipe } from './pipes/person-filter.pipe';
import { PersonsComponent } from './persons/persons.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MyTelInput, PhoneControlComponent} from './phone/phone-control.component';
import { PersonMenuComponent } from './persons/person-menu/person-menu.component';
import { PersonListComponent } from './persons/person-list/person-list.component';
import { IncomeComponent } from './accountant/income/income.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './start/login/login.component';
import {RegisterComponent} from './start/register/register.component';
import {AdminComponent} from './start/admin/admin.component';
import {PmComponent} from './start/pm/pm.component';
import { BodyComponent } from './body/body.component';
import {HomeComponent} from './start/home/home.component';
import { httpInterceptorProviders } from './start/auth/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    AccountantComponent,
    AccountrantPaymentComponent,
    AccountrantCasflowComponent,
    AccountrantReportsComponent,
    AccountrantTransactionComponent,
    AccountrantMenuComponent,
    AdminComponent,
    BodyComponent,
    CommonReportComponent,
    CommonReportComponent,
    ContractComponent,
    ContractListComponent,
    ContractEditComponent,
    ContractNewComponent,
    ContractMenuComponent,
    HomeComponent,
    IncomeComponent,
    LoginComponent,
    MyTelInput,
    MenuMainComponent,
    NotFoundComponent,
    OtherComponent,
    PersonSearchComponent,
    PersonNewComponent,
    PersonEditComponent,
    PersonSelectComponent,
    PersonFilterPipe,
    PersonsComponent,
    PhoneControlComponent,
    PersonMenuComponent,
    PersonListComponent,
    PmComponent,
    RegisterComponent,
    UserComponent,
    WrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    SharedModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
