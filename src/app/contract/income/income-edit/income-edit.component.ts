import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Income} from '../../../shared/income';
import {Subscription} from 'rxjs';
import {faEdit, faSave, faTimes, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {IncomeService} from '../../../services/income.service';
import {UnitService} from '../../../services/unit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {IncomeType} from '../../../shared/income-type';
import {IncomeTypeService} from '../../../services/income-type.service';
import {ContractService} from '../../../services/contract.service';

@Component({
  selector: 'app-income-edit',
  templateUrl: './income-edit.component.html',
  styleUrls: ['./income-edit.component.scss']
})
export class IncomeEditComponent implements OnInit {
  routeBack = '/income/list';
  visible = true;
  incomeEditForm: FormGroup;
  incomes = [];
  contracts = [];
  incometypes = [];
  income: Income;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  fSave = faSave;
  fBack = faTimes;

  constructor(private incomeService: IncomeService,
              private incomeTypeService: IncomeTypeService,
              private contractService: ContractService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {
    this.incomeEditForm = this.fb.group({
      income_id: [''],
      incometype_id: [''],
      dtfrom: [''],
      dtto: [''],
      quantity: [''],
      contract_id: [''],
    });
  }

  ngOnInit(): void {
    this.getIncome();
  }

  getIncome(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.incomeService.getIncome(id)
      .subscribe((income) => {
        this.income = income;
        this.incomeEditForm.controls.income_id.patchValue(this.income.income_id);
        this.incomeEditForm.controls.dtfrom.patchValue(this.income.dtfrom);
        this.incomeEditForm.controls.dtto.patchValue(this.income.dtto);
        this.incomeEditForm.controls.quantity.patchValue(this.income.quantity);
        this.incomeEditForm.controls.incometype_id.patchValue(this.income.incometype_id);
        this.incomeEditForm.controls.contract_id.patchValue(this.income.contract_id);
      });
    this.incomeTypeService.getIncomeTypes()
      .subscribe((incomeTypes) => {
        this.incometypes = incomeTypes;
        this.incomeEditForm.controls.incometype_id.patchValue(this.income.incometype_id);
      });
    this.contractService.getContracts()
      .subscribe((contracts) => {
        this.contracts = contracts;
        // this.incomeEditForm.controls.contract_id.patchValue(this.income.contract_id);
      });
  }

  submit(): void {
    if (this.incomeEditForm.invalid) {
      return;
    }
    const income: Income = {
      income_id: this.incomeEditForm.value.income_id,
      dtfrom: this.incomeEditForm.value.dtfrom,
      dtto: this.incomeEditForm.value.dtto,
      quantity: this.incomeEditForm.value.quantity,
      incometype_id: this.incomeEditForm.value.incometype_id,
      contract_id: this.incomeEditForm.value.contract_id
    };
    this.incomeService.saveIncome(income)
      .subscribe(() => this.goBack());
    this.incomeEditForm.reset();
  }

  delete(income: Income): void {
    this.incomes = this.incomes.filter(p => p !== income);
    this.incomeService.deleteIncome(income).subscribe(() => this.goBack());
  }
  goBack(): void {
    this.router.navigate([this.routeBack]);
  }
}
