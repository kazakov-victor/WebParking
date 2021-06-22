import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../shared/payment';
import {Subscription} from 'rxjs';
import {faEdit, faSave, faTimes, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PaymentService} from '../../../services/payment.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PaymentTypeService} from '../../../services/payment-type.service';
import {ContractService} from '../../../services/contract.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.scss']
})
export class PaymentEditComponent implements OnInit, OnDestroy {
  routeBack = '/accountant/payment/list';
  visible = true;
  paymentEditForm: FormGroup;
  paymenttypes = [];
  contracts = [];
  payment: Payment;
  payments: Payment [];
  sub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  fSave = faSave;
  fBack = faTimes;

  constructor(private paymentService: PaymentService,
              private paymentTypeService: PaymentTypeService,
              private contractService: ContractService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {
    this.paymentEditForm = this.fb.group({
      payment_id: [''],
      payment_type_id: [''],
      contract_id: [''],
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
        this.paymentEditForm.controls.payment_id.patchValue(this.payment.payment_id);
        this.paymentEditForm.controls.note.patchValue(this.payment.note);
        this.paymentEditForm.controls.amount.patchValue(this.payment.amount);
        this.paymentEditForm.controls.ts.patchValue(this.payment.ts);
      });
    this.paymentTypeService.getPaymentTypes()
      .subscribe((types) => {
        this.paymenttypes = types;
        this.paymentEditForm.controls.payment_type_id.patchValue(this.payment.payment_type_id);
        });
    this.contractService.getContracts()
      .subscribe((contracts) => {
        this.contracts = contracts;
        this.paymentEditForm.controls.contract_id.patchValue(this.payment.contract_id);
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
      payment_id: this.paymentEditForm.value.payment_id,
      contract_id: this.paymentEditForm.value.contract_id,
      payment_type_id: this.paymentEditForm.value.payment_type_id,
      ts: this.paymentEditForm.value.ts,
      amount: this.paymentEditForm.value.amount,
      note: this.paymentEditForm.value.note
    };
    this.paymentService.savePayment(payment)
      .subscribe(() => this.location.back());
   // this.paymentEditForm.reset();
  }
  delete(payment: Payment): void {
    this.payments = this.payments.filter(p => p !== payment);
    this.paymentService.deletePayment(payment).subscribe(() => this.goBack());
  }
  goBack(): void {
    // this.location.back();
    this.router.navigate([this.routeBack]);
  }
}
