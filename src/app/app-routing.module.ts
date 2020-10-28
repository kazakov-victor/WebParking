import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {ContractComponent} from './contract/contract.component';
import {AccountantComponent} from './accountant/accountant.component';
import {OtherComponent} from './other/other.component';

import {UserComponent} from './user/user.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {ContractListComponent} from './contract/contract-list/contract-list.component';
import {ContractEditComponent} from './contract/contract-edit/contract-edit.component';
import {ContractNewComponent} from './contract/contract-new/contract-new.component';
import {AccountrantCasflowComponent} from './accountant/accountrant-casflow/accountrant-casflow.component';
import {AccountrantPaymentComponent} from './accountant/accountrant-payment/accountrant-payment.component';
import {AccountrantReportsComponent} from './accountant/accountrant-reports/accountrant-reports.component';
import {AccountrantTransactionComponent} from './accountant/accountrant-transaction/accountrant-transaction.component';

const contractRouts: Routes = [
  {path: 'list', component: ContractListComponent},
  {path: 'edit', component: ContractEditComponent},
  {path: 'new', component: ContractNewComponent},
];
const accountantRouts: Routes = [
  {path: 'cashflow', component: AccountrantCasflowComponent},
  {path: 'payment', component: AccountrantPaymentComponent},
  {path: 'report', component: AccountrantReportsComponent},
  {path: 'transaction', component: AccountrantTransactionComponent},
];
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contract', component: ContractComponent, children: contractRouts},
  {path: 'accountant', component: AccountantComponent, children: accountantRouts},
  {path: 'user', component: UserComponent},
  {path: 'other', component: OtherComponent},
  {path: '', component: AppComponent, pathMatch: 'full'},
  {path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
