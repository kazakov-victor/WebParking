import {Component, OnDestroy, OnInit} from '@angular/core';
import {Payment} from '../../../shared/payment';
import {Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PaymentService} from '../../../services/payment.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit, OnDestroy {
  payments: Payment[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private paymentService: PaymentService,
              private router: Router) { }

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

  btnNewPayment(): void {
    this.router.navigateByUrl('/accountant/payment/new');
    console.log('пытаемся добавить платеж');
  }
}
