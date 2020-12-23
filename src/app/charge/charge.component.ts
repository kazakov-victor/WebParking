import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Charge} from '../shared/charge';
import { faSave} from '@fortawesome/free-solid-svg-icons';
import {ChargeService} from '../services/charge.service';
import {BillingService} from '../services/billing.service';
import {MessageService} from '../services/message.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent implements OnInit {
  routeBack = '/charge/list';
  charges$: Observable<Charge[]>;
  chargeForm: FormGroup;
  fSave = faSave;
  messages: string[] = [];
  constructor(private chargeService: ChargeService,
              private billingService: BillingService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private route: ActivatedRoute) {
    this.chargeForm = this.fb.group({
      charge_date: ['']
        });
  }

  ngOnInit(): void {
    this.getCharges();
  }
  getCharges(): void{
    this.charges$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.chargeService.getCharges();
      })
    );
    this.messages = this.messageService.messages;
  }

  submit(): void {
    if (this.chargeForm.invalid) {
      return;
    }
    this.chargeService.countCharge(this.chargeForm.value.charge_date)
      .subscribe(() => this.getCharges());
  }
}
