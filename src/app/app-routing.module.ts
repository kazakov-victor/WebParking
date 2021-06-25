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
import {RegisterComponent} from './common/login-page/register/register.component';
import {AppComponent} from './app.component';
import {NotFoundComponent} from './common/not-found/not-found.component';
import {OtherComponent} from './common/other/other.component';
import {PersonsComponent} from './persons/persons.component';
import {AccountantComponent} from './accountant/accountant.component';
import {ContractComponent} from './contract/contract.component';
import {AuthGuard} from './services/auth.guard';
import {LoginPageComponent} from './common/login-page/login-page.component';
import {PaymentListComponent} from './accountant/payment/payment-list/payment-list.component';
import {PaymentEditComponent} from './accountant/payment/payment-edit/payment-edit.component';
import {PaymentNewComponent} from './accountant/payment/payment-new/payment-new.component';
import {PaymentTypeComponent} from './accountant/payment-type/payment-type.component';
import {PaymentTypeEditComponent} from './accountant/payment-type/payment-type-edit/payment-type-edit.component';
import {PaymentTypeNewComponent} from './accountant/payment-type/payment-type-new/payment-type-new.component';
import {PaymentTypeListComponent} from './accountant/payment-type/payment-type-list/payment-type-list.component';
import {IncomeTypeComponent} from './contract/income-type/income-type.component';
import {IncomeEditComponent} from './contract/income/income-edit/income-edit.component';
import {IncomeNewComponent} from './contract/income/income-new/income-new.component';
import {IncomeListComponent} from './contract/income/income-list/income-list.component';
import {IncomeTypeEditComponent} from './contract/income-type/income-type-edit/income-type-edit.component';
import {IncomeTypeNewComponent} from './contract/income-type/income-type-new/income-type-new.component';
import {IncomeTypeListComponent} from './contract/income-type/income-type-list/income-type-list.component';
import {NestedFormArrayComponent} from './contract/nested-form-array/nested-form-array.component';
import {PeriodComponent} from './period/period.component';
import {BalanceComponent} from './balance/balance.component';
import {PriceListComponent} from './price/price-list/price-list.component';
import {PriceNewComponent} from './price/price-new/price-new.component';
import {PriceEditComponent} from './price/price-edit/price-edit.component';
import {SaldoComponent} from './saldo/saldo.component';
import {PriceComponent} from './price/price.component';
import {TableOwerviewComponent} from './mat/table-owerview/table-owerview.component';
import {ChargeComponent} from './charge/charge.component';
import {ToolbarComponent} from './toolbar/toolbar.component';

const contractRouts: Routes = [
  {path: 'list', component: ContractListComponent},
  {path: 'toggle/:id', component: ContractEditComponent},
  {path: 'new', component: ContractNewComponent},
];
const paymentRouts: Routes = [
  {path: 'list', component: PaymentListComponent},
  {path: 'toggle/:id', component: PaymentEditComponent},
  {path: 'new', component: PaymentNewComponent},
];
const paymentTypeRouts: Routes = [
  {path: 'list', component: PaymentTypeListComponent},
  {path: 'toggle/:id', component: PaymentTypeEditComponent},
  {path: 'new', component: PaymentTypeNewComponent},
];
const incomeRouts: Routes = [
  {path: 'list', component: IncomeListComponent},
  {path: 'toggle/:id', component: IncomeEditComponent},
  {path: 'new', component: IncomeNewComponent},
];
const incomeTypeRouts: Routes = [
  {path: 'list', component: IncomeTypeListComponent},
  {path: 'toggle/:id', component: IncomeTypeEditComponent},
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
  {path: 'toggle/:id', component: PersonEditComponent},
  {path: 'save', component: PersonListComponent},
];
const priceRouts: Routes = [
  {path: 'list', component: PriceListComponent},
  {path: 'new', component: PriceNewComponent},
  {path: 'toggle/:id', component: PriceEditComponent},
  {path: 'save', component: PriceListComponent},
];
const routes: Routes = [
  {path: 'home', component: AppComponent, canActivate: [AuthGuard]},
  {path: 'main', component: OtherComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
 // {path: '', redirectTo: 'user', pathMatch: 'full'},
  {path: 'auth/login', component: LoginPageComponent},
  {path: 'signup', component: RegisterComponent},

  {path: 'contract', component: ContractComponent, canActivate: [AuthGuard], children: contractRouts},
  {path: 'accountant', component: AccountantComponent, canActivate: [AuthGuard], children: accountantRouts},
   {path: 'income', component: IncomeComponent, canActivate: [AuthGuard], children: incomeRouts},
  {path: 'incometype', component: IncomeTypeComponent, canActivate: [AuthGuard], children: incomeTypeRouts},
  {path: 'person', component: PersonsComponent, canActivate: [AuthGuard],  children: personRouts},
  {path: 'period/list', component: PeriodComponent, canActivate: [AuthGuard]},
  {path: 'balance/list', component: BalanceComponent, canActivate: [AuthGuard]},
  {path: 'saldo/list', component: SaldoComponent, canActivate: [AuthGuard]},
  {path: 'toolbar', component: ToolbarComponent, canActivate: [AuthGuard]},
  {path: 'price', component: PriceComponent, canActivate: [AuthGuard], children: priceRouts},
  {path: 'charge/list', component: ChargeComponent, canActivate: [AuthGuard]},
  {path: 'other', component: OtherComponent},
  {path: 'table', component: TableOwerviewComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    // { enableTracing: true }    <-- debugging purposes only
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
