import {Component, OnDestroy, OnInit} from '@angular/core';
import {IncomeType} from '../../../shared/income-type';
import {Observable, Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IncomeTypeService} from '../../../services/income-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UnitService} from '../../../services/unit.service';
import {Unit} from '../../../shared/unit';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-income-type-list',
  templateUrl: './income-type-list.component.html',
  styleUrls: ['./income-type-list.component.scss']
})
export class IncomeTypeListComponent implements OnInit, OnDestroy {
  incomeTypes$: Observable<IncomeType[]>;
  units: Unit[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;

  constructor(private incomeTypeService: IncomeTypeService,
              private unitService: UnitService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getIncomeTypes();
  }
  getIncomeTypes(): void{
    this.incomeTypes$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.incomeTypeService.getIncomeTypes();
      })
    );
    this.unitService.getUnits().subscribe(response => {
      console.log('Response unit - ', response);
      this.units = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  edit(incomeTypeId: number): void {
    this.incomeTypeService.getIncomeType(incomeTypeId).subscribe(() => {
      this.router.navigate(['/incometype/edit/', incomeTypeId]);
    });
  }
}
