import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../shared/payment';
import {Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PaymentService} from '../../../services/payment.service';

@Component({
  selector: 'app-payment-edit',
  templateUrl: './payment-edit.component.html',
  styleUrls: ['./payment-edit.component.scss']
})
export class PaymentEditComponent implements OnInit, OnDestroy {
  payments: Payment[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getPayments();
  }
  getPayments(): void{
    this.paymentService.getPayments().subscribe(response => {
      console.log('Response - ', response);
      this.payments = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  edit(paymentId: number): void {
    this.paymentService.getPayment(paymentId).subscribe();
  }
  delete(payment: Payment): void {
    this.payments = this.payments.filter(p => p !== payment);
    this.paymentService.deletePayment(payment).subscribe();
  }

}
