import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {PaymentService} from '../../../services/payment.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Payment} from '../../../shared/payment';
import {debounceTime, distinctUntilChanged, first, map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {Person} from '../../../shared/person';
import {PaymentType} from '../../../shared/payment-type';
import {PaymentTypeService} from '../../../services/payment-type.service';
import {ContractService} from '../../../services/contract.service';
import {Contract} from '../../../shared/contract';

@Component({
  selector: 'app-payment-new',
  templateUrl: './payment-new.component.html',
  styleUrls: ['./payment-new.component.scss'],
  animations: [
    trigger('popup-window', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('850ms ease-out')
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(750, style({
          opacity: 0,
        }))
      ])
    ])
  ]
})

export class PaymentNewComponent implements OnInit {
  visible = true;
  paymentNewForm: FormGroup;
  paymenttypes = [];
  contracts = [];
  sub: Subscription;
  currentDate: string;
  constructor(private paymentService: PaymentService,
              private paymentTypeService: PaymentTypeService,
              private contractService: ContractService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
    this.paymentNewForm = this.fb.group({
      payment_type_id: [''],
      contract_id: [''],
      ts: [''],
      amount: [''],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.newPayment();
  }
  newPayment(): any {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.paymentNewForm.controls.ts.patchValue(this.currentDate);
    this.paymentTypeService.getPaymentTypes()
      .subscribe((types) => {
        console.log('Types = ', types);
        this.paymenttypes = types;
        this.paymentNewForm.controls.payment_type_id.patchValue(this.paymenttypes[0].payment_type_id);
      });
    this.contractService.getContracts()
      .subscribe((contracts) => {
        this.contracts = contracts;
        console.log('This contracts --', this.contracts);
        this.paymentNewForm.controls.contract_id.patchValue(this.contracts[0].contract_id);
      });
  }

  addPayment(): any {
    const control = this.fb.group({
      payment_type_id: [''],
      contract_id: [''],
      ts: [''],
      amount: [''],
      note: ['']
    });
  }

  submit(): void {
    console.log('NewForm - ', this.paymentNewForm);
    if (this.paymentNewForm.invalid) {
      return;
    }
    const payment: Payment = {
      contract_id: this.paymentNewForm.value.contract_id,
      payment_type_id: this.paymentNewForm.value.payment_type_id,
      ts: this.paymentNewForm.value.ts,
      amount: this.paymentNewForm.value.amount,
      note: this.paymentNewForm.value.note
    };
    console.log('This payment (new) before save --', payment);
    this.paymentService.savePayment(payment).subscribe(() => { this.location.back(); });
    this.paymentNewForm.reset();
  }

  goBack(): void {
    this.location.back();
  }

  submitAndBack(): void {
    this.submit();
    this.goBack();
  }

  onPaymentTypeChange(): void {

  }
}
