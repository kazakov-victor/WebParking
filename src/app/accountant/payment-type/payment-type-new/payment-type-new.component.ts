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
  private searchTerms = new BehaviorSubject<string>('all');
  sub: Subscription;

// Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(private paymentTypeService: PaymentTypeService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {

    this.paymentTypes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.paymentTypeService.searchPaymentTypes(term)),
    );

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
    this.paymentTypeService.addPaymentType(paymentType).subscribe();
    this.paymentTypeNewForm.reset();
    this.location.back();
  }
}

