import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContractListComponent} from './contract/contract-list/contract-list.component';
import {ContractEditComponent} from './contract/contract-edit/contract-edit.component';
import {ContractNewComponent} from './contract/contract-new/contract-new.component';
import {AccountrantCasflowComponent} from './accountant/accountrant-casflow/accountrant-casflow.component';
import {PaymentComponent} from './accountant/payment/payment.component';
import {AccountrantReportsComponent} from './accountant/accountrant-reports/accountrant-reports.component';
import {AccountrantTransactionComponent} from './accountant/accountrant-transaction/accountrant-transaction.component';
import {PersonNewComponent} from './persons/person-new/person-new.component';
import {PersonEditComponent} from './persons/person-edit/person-edit.component';
import {PersonListComponent} from './persons/person-list/person-list.component';
import {IncomeComponent} from './contract/income/income.component';
import {RegisterComponent} from './login-page/register/register.component';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {OtherComponent} from './other/other.component';
import {PersonsComponent} from './persons/persons.component';
import {AccountantComponent} from './accountant/accountant.component';
import {ContractComponent} from './contract/contract.component';
import {CommonReportComponent} from './common-report/common-report.component';
import {AuthGuard} from './services/auth.guard';
import {LoginPageComponent} from './login-page/login-page.component';
import {PaymentListComponent} from './accountant/payment/payment-list/payment-list.component';
import {PaymentEditComponent} from './accountant/payment/payment-edit/payment-edit.component';
import {PaymentNewComponent} from './accountant/payment/payment-new/payment-new.component';
import {PaymentTypeComponent} from './accountant/payment-type/payment-type.component';
import {PaymentTypeEditComponent} from './accountant/payment-type/payment-type-edit/payment-type-edit.component';
import {PaymentTypeNewComponent} from './accountant/payment-type/payment-type-new/payment-type-new.component';
import {PaymentTypeListComponent} from './accountant/payment-type/payment-type-list/payment-type-list.component';
import {UnitListComponent} from './contract/unit/unit-list/unit-list.component';
import {UnitEditComponent} from './contract/unit/unit-edit/unit-edit.component';
import {UnitNewComponent} from './contract/unit/unit-new/unit-new.component';
import {UnitComponent} from './contract/unit/unit.component';
import {IncomeTypeComponent} from './contract/income-type/income-type.component';
import {IncomeEditComponent} from './contract/income/income-edit/income-edit.component';
import {IncomeNewComponent} from './contract/income/income-new/income-new.component';
import {IncomeListComponent} from './contract/income/income-list/income-list.component';
import {IncomeTypeEditComponent} from './contract/income-type/income-type-edit/income-type-edit.component';
import {IncomeTypeNewComponent} from './contract/income-type/income-type-new/income-type-new.component';
import {IncomeTypeListComponent} from './contract/income-type/income-type-list/income-type-list.component';
import {NestedFormArrayComponent} from './contract/nested-form-array/nested-form-array.component';

const contractRouts: Routes = [
  {path: 'list', component: ContractListComponent},
  {path: 'edit/:id', component: ContractEditComponent},
  {path: 'new', component: ContractNewComponent},
];
const paymentRouts: Routes = [
  {path: 'list', component: PaymentListComponent},
  {path: 'edit/:id', component: PaymentEditComponent},
  {path: 'new', component: PaymentNewComponent},
];
const paymentTypeRouts: Routes = [
  {path: 'list', component: PaymentTypeListComponent},
  {path: 'edit/:id', component: PaymentTypeEditComponent},
  {path: 'new', component: PaymentTypeNewComponent},
];
const unitRouts: Routes = [
  {path: 'list', component: UnitListComponent},
  {path: 'edit/:id', component: UnitEditComponent},
  {path: 'new', component: UnitNewComponent},
];
const incomeRouts: Routes = [
  {path: 'list', component: IncomeListComponent},
  {path: 'edit/:id', component: IncomeEditComponent},
  {path: 'new', component: IncomeNewComponent},
];
const incomeTypeRouts: Routes = [
  {path: 'list', component: IncomeTypeListComponent},
  {path: 'edit/:id', component: IncomeTypeEditComponent},
  {path: 'new', component: IncomeTypeNewComponent},
];
const accountantRouts: Routes = [
  {path: 'cashflow', component: AccountrantCasflowComponent},
  {path: 'payment', component: PaymentComponent, children: paymentRouts},
  {path: 'paymenttype', component: PaymentTypeComponent, children: paymentTypeRouts},
  {path: 'report', component: AccountrantReportsComponent},
  {path: 'transaction', component: AccountrantTransactionComponent},
  {path: 'income', component: IncomeComponent},
];
const personRouts: Routes = [
  {path: 'list', component: PersonListComponent},
  {path: 'new', component: PersonNewComponent},
  {path: 'edit/:id', component: PersonEditComponent},
  {path: 'save', component: PersonListComponent},
];
const routes: Routes = [
  {path: 'home', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'main', component: NestedFormArrayComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
 // {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path: 'auth/login', component: LoginPageComponent},
  {path: 'signup', component: RegisterComponent},

  {path: 'contract', component: ContractComponent, canActivate: [AuthGuard], children: contractRouts},
  {path: 'accountant', component: AccountantComponent, canActivate: [AuthGuard], children: accountantRouts},
  {path: 'unit', component: UnitComponent, canActivate: [AuthGuard], children: unitRouts},
  {path: 'income', component: IncomeComponent, canActivate: [AuthGuard], children: incomeRouts},
  {path: 'incometype', component: IncomeTypeComponent, canActivate: [AuthGuard], children: incomeTypeRouts},
  {path: 'person', component: PersonsComponent, canActivate: [AuthGuard],  children: personRouts},
  {path: 'other', component: OtherComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true }    <-- debugging purposes only
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
