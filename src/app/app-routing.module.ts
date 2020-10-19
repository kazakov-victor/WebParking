import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';
import {ContractComponent} from './contract/contract.component';
import {AccountantComponent} from './accountant/accountant.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contract', component: ContractComponent},
  {path: 'accountant', component: AccountantComponent},
  {path: '', component: AppComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
