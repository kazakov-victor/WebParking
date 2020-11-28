
import { NgModule } from '@angular/core';
import { AccountantComponent } from './accountant/accountant.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaymentComponent } from './accountant/payment/payment.component';
import { AccountrantCasflowComponent } from './accountant/accountrant-casflow/accountrant-casflow.component';
import { AccountrantReportsComponent } from './accountant/accountrant-reports/accountrant-reports.component';
import { AccountrantTransactionComponent } from './accountant/accountrant-transaction/accountrant-transaction.component';
import { AccountrantMenuComponent } from './accountant/accountrant-menu/accountrant-menu.component';
import { BodyComponent } from './body/body.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { ContractEditComponent } from './contract/contract-edit/contract-edit.component';
import { ContractNewComponent } from './contract/contract-new/contract-new.component';
import { ContractMenuComponent } from './contract/contract-menu/contract-menu.component';
import { CommonReportComponent } from './common-report/common-report.component';
import { ContractComponent } from './contract/contract.component';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {HttpClientModule} from '@angular/common/http';
import { MenuMainComponent } from './menu-main/menu-main.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MyTelInput, PhoneControlComponent} from './phone/phone-control.component';

import { NotFoundComponent } from './not-found/not-found.component';
import { OtherComponent } from './other/other.component';

import { PersonSearchComponent } from './persons/person-search/person-search.component';
import { PersonNewComponent } from './persons/person-new/person-new.component';
import { PersonEditComponent } from './persons/person-edit/person-edit.component';
import { PersonSelectComponent } from './persons/person-select/person-select.component';
import { PersonFilterPipe } from './pipes/person-filter.pipe';
import { PersonsComponent } from './persons/persons.component';
import { PersonMenuComponent } from './persons/person-menu/person-menu.component';
import { PersonListComponent } from './persons/person-list/person-list.component';
import { IncomeComponent } from './accountant/income/income.component';
import {SharedModule} from './shared/shared.module';
import {RegisterComponent} from './login-page/register/register.component';
import { httpInterceptorProviders } from './services/auth/auth-interceptor';
import { MenuUserComponent } from './menu-user/menu-user.component';
import { MenuAccountComponent } from './menu-account/menu-account.component';
import {LoginPageComponent} from './login-page/login-page.component';
import { PaymentListComponent } from './accountant/payment/payment-list/payment-list.component';
import { PaymentEditComponent } from './accountant/payment/payment-edit/payment-edit.component';
import { PaymentNewComponent } from './accountant/payment/payment-new/payment-new.component';
import { PaymentTypeComponent } from './accountant/payment-type/payment-type.component';
import { PaymentTypeListComponent } from './accountant/payment-type/payment-type-list/payment-type-list.component';
import { PaymentTypeNewComponent } from './accountant/payment-type/payment-type-new/payment-type-new.component';
import { PaymentTypeEditComponent } from './accountant/payment-type/payment-type-edit/payment-type-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountantComponent,
    AccountrantCasflowComponent,
    AccountrantReportsComponent,
    AccountrantTransactionComponent,
    AccountrantMenuComponent,
    BodyComponent,
    CommonReportComponent,
    CommonReportComponent,
    ContractComponent,
    ContractListComponent,
    ContractEditComponent,
    ContractNewComponent,
    ContractMenuComponent,
    IncomeComponent,
    LoginPageComponent,
    MyTelInput,
    MenuMainComponent,
    NotFoundComponent,
    OtherComponent,
    PaymentComponent,
    PaymentListComponent,
    PaymentEditComponent,
    PaymentNewComponent,
    PersonSearchComponent,
    PersonNewComponent,
    PersonEditComponent,
    PersonSelectComponent,
    PersonFilterPipe,
    PersonsComponent,
    PhoneControlComponent,
    PersonMenuComponent,
    PersonListComponent,
    RegisterComponent,
    WrapperComponent,
    MenuUserComponent,
    MenuAccountComponent,
    PaymentTypeComponent,
    PaymentTypeListComponent,
    PaymentTypeNewComponent,
    PaymentTypeEditComponent,
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
