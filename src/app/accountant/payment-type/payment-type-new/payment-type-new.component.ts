import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PaymentType} from '../../../shared/payment-type';
import {PaymentTypeService} from '../../../services/payment-type.service';

@Component({
  selector: 'app-payment-type-new',
  templateUrl: './payment-type-new.component.html',
  styleUrls: ['./payment-type-new.component.scss'],
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
          // transform: 'scale(1.2)'
        }))
      ])
    ])
  ]
})

export class PaymentTypeNewComponent implements OnInit {
  visible = true;
  paymentTypeNewForm: FormGroup;
  paymentTypes$: Observable<PaymentType[]>;
  sub: Subscription;

  constructor(private paymentTypeService: PaymentTypeService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paymentTypeNewForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.paymentTypeNewForm.invalid) {
      return;
    }
    const paymentType: PaymentType = {
      name: this.paymentTypeNewForm.value.name,
    };
    this.paymentTypeService.savePaymentType(paymentType).subscribe(() => this.location.back() );
    this.paymentTypeNewForm.reset();
  }
}

