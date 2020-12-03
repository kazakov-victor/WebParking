import {Component, OnInit} from '@angular/core';
import {Income} from '../../../shared/income';
import {Observable} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IncomeService} from '../../../services/income.service';
import {UnitService} from '../../../services/unit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-income-list',
  templateUrl: './income-list.component.html',
  styleUrls: ['./income-list.component.scss']
})
export class IncomeListComponent implements OnInit {
  incomes$: Observable<Income[]>;
  incomes: Income[] = [];
  fEdit = faEdit;
  fTrash = faTrashAlt;

  constructor(private incomeService: IncomeService,
              private unitService: UnitService,
              private route: ActivatedRoute,
              private router: Router) {  }

  ngOnInit(): void {
    this.getIncomes();
  }
  getIncomes(): void{
    this.incomes$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.incomeService.getIncomes();
      })
    );
  }

  edit(incomeId: number): void {
    this.incomeService.getIncome(incomeId).subscribe(() => {
      this.router.navigate(['/income/edit/', incomeId]);
    });
  }
}
