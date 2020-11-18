import {Component, OnDestroy, OnInit} from '@angular/core';
import {Income} from '../../services/income';
import {Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IncomeService} from '../../services/income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit, OnDestroy {

  incomes: Income[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private incomeService: IncomeService) { }

  ngOnInit(): void {
    this.getIncomes();
  }
  getIncomes(): void{
    this.incomeService.getIncomes().subscribe(response => {
      console.log('Response - ', response);
      this.incomes = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  edit(incomeId: number): void {
    this.incomeService.getIncome(incomeId).subscribe();
  }
  delete(income: Income): void {
    this.incomes = this.incomes.filter(p => p !== income);
    this.incomeService.deleteIncome(income).subscribe();
  }
}
