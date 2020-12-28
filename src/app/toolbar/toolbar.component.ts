import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Saldo} from '../shared/saldo';
import {faEdit, faSave, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {SaldoService} from '../services/saldo.service';
import {MessageService} from '../services/message.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import {default as _rollupMoment, Moment} from 'moment';
import {ToolbarService} from '../services/toolbar.service';
import {DatePipe} from '@angular/common';

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
  providers: [  {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ToolbarComponent implements OnInit {
  fSave = faSave;
  saldos$: Observable<Saldo[]>;
  messages: string[] = [];
  toolbarForm: FormGroup;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private saldoService: SaldoService,
              private toolbarService: ToolbarService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private datePipe: DatePipe,
              private router: Router) {
    /*this.toolbarForm = this.fb.group({
    date: ['']
  });*/
  }

   date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment): void {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    console.log('ctrlValue 1 - ', ctrlValue);
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>): void {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    console.log('ctrlValue 2 -', ctrlValue);
    this.date.setValue(ctrlValue);
    datepicker.close();
  }


  ngOnInit(): void {
    this.getSaldos();
  }
  getSaldos(): void{
    this.saldos$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.saldoService.getSaldos();
      })
    );
    this.messages = this.messageService.messages;
  }

  edit(saldoId: number): void {
    this.saldoService.getSaldo(saldoId).subscribe(() => {
      this.router.navigate(['/saldo/toggle/', saldoId]);
    });
  }
  submit(): void {
    if (this.toolbarForm.invalid) {
      return;
    }
    console.log('Date - ', this.toolbarForm.value);
    /*this.toolbarService.countCharge(this.toolbarForm.value.charge_date)
      .subscribe();*/
  }
  dateValue(): any {
    console.log(this.datePipe.transform(this.date.value, 'dd-MM-yyyy'));
  }
}
