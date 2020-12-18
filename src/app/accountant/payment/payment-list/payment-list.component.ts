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
import {Observable, Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PaymentService} from '../../../services/payment.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit, OnDestroy {
  payments$: Observable<Payment[]>;
  payments: Payment[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;

  constructor(private paymentService: PaymentService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    console.log('OnInit');
    this.getPayments();
  }
  getPayments(): void{
    this.payments$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.paymentService.getPayments();
      })
    );
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  edit(paymentId: number): void {
    this.paymentService.getPayment(paymentId).subscribe(() => {
      this.router.navigate(['/accountant/payment/toggle/', paymentId]);
    });
  }
}
