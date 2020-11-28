import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaymentType} from '../../../shared/payment-type';
import {Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PaymentTypeService} from '../../../services/payment-type.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-type-list',
  templateUrl: './payment-type-list.component.html',
  styleUrls: ['./payment-type-list.component.scss']
})
export class PaymentTypeListComponent implements OnInit, OnDestroy {
  paymentTypes: PaymentType[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private paymentTypeService: PaymentTypeService,
              private router: Router) { }

  ngOnInit(): void {
    this.getPaymentTypes();
  }
  getPaymentTypes(): void{
    this.paymentTypeService.getPaymentTypes().subscribe(response => {
      console.log('Response - ', response);
      this.paymentTypes = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  edit(paymentTypeId: number): void {
    this.paymentTypeService.getPaymentType(paymentTypeId).subscribe();
  }
  delete(paymentType: PaymentType): void {
    this.paymentTypes = this.paymentTypes.filter(p => p !== paymentType);
    this.paymentTypeService.deletePaymentType(paymentType).subscribe();
  }

  btnNewPaymentType(): void {
    this.router.navigateByUrl('/accountant/paymenttype/new');
    console.log('пытаемся добавить  тип оплаты');
  }
}

