import { Component, OnInit } from '@angular/core';
import {Period} from '../shared/period';
import {Observable} from 'rxjs';
import {faEdit, faExchangeAlt, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PeriodService} from '../services/period.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MessageService} from '../services/message.service';
import {BillingService} from '../services/billing.service';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  routeBack = '/period/list';
  periods$: Observable<Period[]>;
  messages: string[] = [];
  fEdit = faEdit;
  fTrash = faTrashAlt;
  fChange = faExchangeAlt;
  constructor(private periodService: PeriodService,
              private billingService: BillingService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getPeriods();
  }
  getPeriods(): void{
    this.periods$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.periodService.getPeriods();
      })
    );
    this.messages = this.messageService.messages;
  }

  toggle(periodId: number): void {
    this.periodService.toggleClosePeriod(periodId)
      .subscribe(() => this.getPeriods());
  }
  count(periodId: number): void {
    this.billingService.countBillingPeriodNo404(periodId)
      .subscribe(() => this.getPeriods());
  }
  create(date: number): void {
    this.periodService.createPeriod(date)
      .subscribe(() => this.getPeriods());
  }
}
