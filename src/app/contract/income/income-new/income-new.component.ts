import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IncomeService} from '../../../services/income.service';
import {UnitService} from '../../../services/unit.service';
import {ActivatedRoute} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {Income} from '../../../shared/income';
import {IncomeTypeService} from '../../../services/income-type.service';
import {ContractService} from '../../../services/contract.service';
import {faSave, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-income-new',
  templateUrl: './income-new.component.html',
  styleUrls: ['./income-new.component.scss']
})
export class IncomeNewComponent implements OnInit {
  visible = true;
  incomeNewForm: FormGroup;
  incomes = [];
  incometypes = [];
  contracts = [];
  sub: Subscription;
  currentDate: string;
  fSave = faSave;
  fBack = faTimes;
  constructor(private incomeService: IncomeService,
              private incomeTypeService: IncomeTypeService,
              private contractService: ContractService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
    this.incomeNewForm = this.fb.group({
      income_id: [''],
      dtfrom: [''],
      dtto: [''],
      quantity: [''],
      income_type_id: [''],
      contract_id: ['']
    });
  }

  ngOnInit(): void {
    this.newIncome();
  }
  newIncome(): any {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.incomeNewForm.controls.dtfrom.patchValue(this.currentDate);
    this.incomeNewForm.controls.quantity.patchValue(1);
    this.incomeTypeService.getIncomeTypes()
      .subscribe((incomeTypes) => {
        this.incometypes = incomeTypes;
        this.incomeNewForm.controls.income_type_id.patchValue(this.incometypes[0].income_type_id);
      });
    this.incomeTypeService.getIncomeTypes()
      .subscribe((incomeTypes) => {
        this.incometypes = incomeTypes;
     //   this.incomeNewForm.controls.income_type_id.patchValue(this.incometypes[0].income_type_id);
      });
    this.contractService.getContracts()
      .subscribe((contracts) => {
        this.contracts = contracts;
        this.incomeNewForm.controls.contract_id.patchValue(this.contracts[0].contract_id);
      });
  }
/*
  addIncome(): any {
    const control = this.fb.group({
      income_id: [''],
      unit_id: [''],
      name: [''],
      note: ['']
    });
  }*/

  submit(): void {
    if (this.incomeNewForm.invalid) {
      return;
    }
    const income: Income = {
      dtfrom: this.incomeNewForm.value.dtfrom,
      dtto: this.incomeNewForm.value.dtto,
      quantity: this.incomeNewForm.value.quantity,
      income_type_id: this.incomeNewForm.value.income_type_id,
      contract_id: this.incomeNewForm.value.contract_id
    };
    this.incomeService.saveIncome(income).subscribe(() => { this.location.back(); });
    this.incomeNewForm.reset();
  }

  goBack(): void {
    this.location.back();
  }

  submitAndBack(): void {
    this.submit();
    this.goBack();
  }

  onIncomeChange(): void {

  }
}
