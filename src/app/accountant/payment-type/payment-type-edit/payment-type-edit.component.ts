import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PaymentType} from '../../../shared/payment-type';
import {PaymentTypeService} from '../../../services/payment-type.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-payment-type-edit',
  templateUrl: './payment-type-edit.component.html',
  styleUrls: ['./payment-type-edit.component.scss']
})
export class PaymentTypeEditComponent implements OnInit {
  visible = true;
  paymentTypeEditForm: FormGroup;
  paymentType: PaymentType;
  sub: Subscription;
  constructor(private paymentTypeService: PaymentTypeService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) { }

  ngOnInit(): void {
 this.getPaymentType();
  }

  getPaymentType(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.paymentTypeService.getPaymentType(id)
      .subscribe((paymentTypeRes) => {
        this.paymentType = paymentTypeRes;
        this.paymentTypeEditForm = this.fb.group({
          payment_type_id: [this.paymentType.payment_type_id, Validators.required],
          name: [this.paymentType.name, Validators.required] });
    });
  }

  submit(): void {
    if (this.paymentTypeEditForm.invalid) {
      return;
    }
    const paymentType: PaymentType = {
      payment_type_id: this.paymentTypeEditForm.value.payment_type_id,
      name: this.paymentTypeEditForm.value.name,
    };
    console.log('PT - ', paymentType);
    this.paymentTypeService.savePaymentType(paymentType).subscribe(() => this.location.back());
    this.paymentTypeEditForm.reset();
  }
}

