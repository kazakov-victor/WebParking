import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, group, state, style, transition, trigger} from '@angular/animations';
import {PaymentService} from '../../../services/payment.service';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Payment} from '../../../shared/payment';
import {debounceTime, distinctUntilChanged, first, map, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
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
  paymentTypes$: Observable<PaymentType[]>;
  contracts: Contract[] = [];
  sub: Subscription;

  constructor(private paymentService: PaymentService,
              private paymentTypeService: PaymentTypeService,
              private contractService: ContractService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {}

  ngOnInit(): void {
     this.paymentTypes$ = this.paymentTypeService.getPaymentTypes();
   // this.getPaymentTypes();
     this.getContracts();
     this.paymentNewForm = this.fb.group({
      payment_type_id: [1, Validators.required],
      contract_id: ['', Validators.required],
      ts: ['', Validators.required],
      amount: [''],
      note: [''],
    });
  }
 /* getPaymentTypes(): void {
    const sb = this.paymentTypeService.getPaymentTypes()
      .subscribe(response => {
      console.log('Response - ', response);
      this.paymentTypes$ = response;
    });
  }*/
  getContracts(): void {
    this.contractService.getContracts()
      .subscribe(response => {
        console.log('Response - ', response);
        this.contracts = response;
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
    if (this.paymentNewForm.invalid) {
      return;
    }
    const payment: Payment = {
      payment_type_id: this.paymentNewForm.value.payment_type_id,
      contract_id: this.paymentNewForm.value.contract_id,
      ts: this.paymentNewForm.value.ts,
      amount: this.paymentNewForm.value.amount,
      note: this.paymentNewForm.value.note
    };
    this.paymentService.addPayment(payment).subscribe();
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
