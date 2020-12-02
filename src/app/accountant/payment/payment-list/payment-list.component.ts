import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component, DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
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
export class PaymentListComponent implements OnInit, OnDestroy,
  DoCheck,
  OnChanges,
  AfterContentInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit {
  payments: Payment[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;

  constructor(private paymentService: PaymentService,
              private router: Router) {
  }

  ngAfterContentChecked(): void {
        console.log('AfterContentChecked');
    }

  ngAfterContentInit(): void {
    console.log('AfterContentInit');
    }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges');
    }

  ngDoCheck(): void {
    console.log('DoCheck');
    }

  ngOnInit(): void {
    console.log('OnInit');
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

  ngAfterViewChecked(): void {
    console.log('AfterViewChecked');
  }

  ngAfterViewInit(): void {
    console.log('AfterViewInit');
  }
}
