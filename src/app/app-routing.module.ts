import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './start/user/user.component';
import {ContractListComponent} from './contract/contract-list/contract-list.component';
import {ContractEditComponent} from './contract/contract-edit/contract-edit.component';
import {ContractNewComponent} from './contract/contract-new/contract-new.component';
import {AccountrantCasflowComponent} from './accountant/accountrant-casflow/accountrant-casflow.component';
import {AccountrantPaymentComponent} from './accountant/accountrant-payment/accountrant-payment.component';
import {AccountrantReportsComponent} from './accountant/accountrant-reports/accountrant-reports.component';
import {AccountrantTransactionComponent} from './accountant/accountrant-transaction/accountrant-transaction.component';
import {PersonNewComponent} from './persons/person-new/person-new.component';
import {PersonEditComponent} from './persons/person-edit/person-edit.component';
import {PersonListComponent} from './persons/person-list/person-list.component';
import {IncomeComponent} from './accountant/income/income.component';
import {RegisterComponent} from './start/register/register.component';
import {LoginComponent} from './start/login/login.component';
import {AdminComponent} from './start/admin/admin.component';
import {PmComponent} from './start/pm/pm.component';
import {HomeComponent} from './start/home/home.component';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {OtherComponent} from './other/other.component';
import {PersonsComponent} from './persons/persons.component';
import {AccountantComponent} from './accountant/accountant.component';
import {ContractComponent} from './contract/contract.component';
import {CommonReportComponent} from './common-report/common-report.component';

const contractRouts: Routes = [
  {path: 'list', component: ContractListComponent},
  {path: 'edit/:id', component: ContractEditComponent},
  {path: 'new', component: ContractNewComponent},
];
const accountantRouts: Routes = [
  {path: 'cashflow', component: AccountrantCasflowComponent},
  {path: 'payment', component: AccountrantPaymentComponent},
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
  {path: 'home', component: AppComponent},
  {path: 'main', component: CommonReportComponent},
  {path: 'user', component: UserComponent},
  {path: 'pm', component: PmComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'auth/login', component: LoginComponent},
  {path: 'signup', component: RegisterComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'contract', component: ContractComponent, children: contractRouts},
  {path: 'accountant', component: AccountantComponent, children: accountantRouts},
  {path: 'person', component: PersonsComponent, children: personRouts},
  {path: 'other', component: OtherComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
