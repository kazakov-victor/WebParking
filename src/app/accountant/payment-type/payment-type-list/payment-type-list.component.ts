import { Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentType} from '../../../shared/payment-type';
import {Observable, Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PaymentTypeService} from '../../../services/payment-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UnitService} from '../../../services/unit.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-payment-type-list',
  templateUrl: './payment-type-list.component.html',
  styleUrls: ['./payment-type-list.component.scss']
})
export class PaymentTypeListComponent implements OnInit, OnDestroy {
  paymentTypes$: Observable<PaymentType[]>;
  paymentTypes: PaymentType[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private paymentTypeService: PaymentTypeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getPaymentTypes();
  }
  getPaymentTypes(): void{
    this.paymentTypes$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.paymentTypeService.getPaymentTypes();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  edit(paymentTypeId: number): void {
    this.paymentTypeService.getPaymentType(paymentTypeId).subscribe(() => {
      this.router.navigate(['/accountant/paymenttype/toggle/', paymentTypeId]);
    });
  }
}

