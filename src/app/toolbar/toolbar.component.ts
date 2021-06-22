import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {PaymentService} from '../services/payment.service';
import {PaymentTypeService} from '../services/payment-type.service';
import {ContractService} from '../services/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ToolbarService} from '../services/toolbar.service';


const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ToolbarComponent implements OnInit {
  contracts = [];
  toolbarForm: FormGroup;
  period: string;
  date = new FormControl(moment());
  constructor(private contractService: ContractService,
              private toolbarService: ToolbarService,
              private fb: FormBuilder) {
    this.toolbarForm = this.fb.group({
    period: [''],
    contract_id: [''],
    action: ['']
  });
  }

  ngOnInit(): void {
    this.contractService.getContracts()
      .subscribe((contracts) => {
        this.contracts = contracts;
       // this.toolbarForm.controls.contract_id.patchValue(this.contracts.  .contract_id);
      });
    }
  chosenYearHandler(normalizedYear: Moment): any {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): any {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  dateValue(): any {
    console.log('This is - ', JSON.stringify(this.date.value).substring(1, 11));
  }

  onSubmit(value: any): void {
    this.period = JSON.stringify(this.date.value).substring(1, 11);
    this.toolbarService.countCharge(this.period);
  }
}



