import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../shared/payment';
import {Observable, Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PaymentService} from '../../../services/payment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentType} from '../../../shared/payment-type';
import {Contract} from '../../../shared/contract';
import {PaymentTypeService} from '../../../services/payment-type.service';
import {ContractService} from '../../../services/contract.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.scss']
})
export class PaymentEditComponent implements OnInit, OnDestroy {
  visible = true;
  paymentEditForm: FormGroup;
  paymenttypes = [];
  contracts = [];
  payment: Payment;
  sub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;

  constructor(private paymentService: PaymentService,
              private paymentTypeService: PaymentTypeService,
              private contractService: ContractService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
    this.paymentEditForm = this.fb.group({
      paymenttypes: [''],
   //   paymentType: [''],
      contracts: [''],
      ts: [''],
      amount: [''],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.getPayment();
  }
  getPayment(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.paymentService.getPayment(id)
      .subscribe((payment) => {
        this.payment = payment;
        console.log('This payment --', this.payment);
        this.paymentEditForm.controls.note.patchValue(this.payment.note);
        this.paymentEditForm.controls.amount.patchValue(this.payment.amount);
        this.paymentEditForm.controls.ts.patchValue(this.payment.ts);
      //  this.paymentEditForm.controls.note.patchValue(this.payment[id].note);
      //  this.paymentEditForm.controls.paymentType.patchValue(this.payment[id].paymentType);
});
    this.paymentTypeService.getPaymentTypes()
      .subscribe((types) => {
        console.log('Types = ', types);
        this.paymenttypes = types;
        this.paymentEditForm.controls.paymenttypes.patchValue(this.payment.paymentType.payment_type_id);
       // this.paymentEditForm.controls.paymenttypes.patchValue(this.paymenttypes[0].payment_type_id);
      });
    this.contractService.getContracts()
      .subscribe((contracts) => {
        this.contracts = contracts;
        console.log('This payment.contract 222 --', this.payment.contract);
      //  this.paymentEditForm.controls.conracts.patchValue(this.payment.contract.contract_id);
      //  this.paymentEditForm.controls.conracts.patchValue(this.contracts[0].contract_id);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  submit(): void {
    if (this.paymentEditForm.invalid) {
      return;
    }
    const payment: Payment = {
    //  contract_id: this.paymentEditForm.value.contract_id,
    //  paymentType: this.paymentEditForm.value.paymentType,
    //  ts: this.paymentEditForm.value.ts,
    //  amount: this.paymentEditForm.value.amount,
      note: this.paymentEditForm.value.note
    };
    this.paymentService.addPayment(payment)
      .subscribe(() => this.location.back());
    this.paymentEditForm.reset();
  }

  goBack(): void {
    this.location.back();
  }
}
