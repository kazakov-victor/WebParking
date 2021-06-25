import { Component, OnInit } from '@angular/core';
import {IncomeTypeService} from '../../services/income-type.service';
import {BasisService} from '../../services/basis.service';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {PriceService} from '../../services/price.service';
import {IncomeType} from '../../shared/income-type';
import {Price} from '../../shared/price';
import {faSave, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-price-new',
  templateUrl: './price-new.component.html',
  styleUrls: ['./price-new.component.scss']
})
export class PriceNewComponent implements OnInit {
  routeBack = '/price/list';
  visible = true;
  priceNewForm: FormGroup;
  prices = [];
  incometypes = [];
  sub: Subscription;
  currentDate: string;
  fSave = faSave;
  fBack = faTimes;
  constructor(private priceService: PriceService,
              private incomeTypeService: IncomeTypeService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {this.priceNewForm = this.fb.group({
    incometype_id: [''],
    dtfrom: [''],
    dtto: [''],
    amount: [''],
  }); }

  ngOnInit(): void {
    this.newPrice();
  }
  newPrice(): any {
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.priceNewForm.controls.dtfrom.patchValue(this.currentDate);
    this.incomeTypeService.getIncomeTypes()
      .subscribe((incomeTypes) => {
        this.incometypes = incomeTypes;
        this.priceNewForm.controls.incometype_id.patchValue(this.incometypes[0].incometype_id);
      });
  }

  addPrice(): any {
    const control = this.fb.group({
      incometype: [''],
      dtfrom: [''],
      dtto: [''],
      amount: ['']
    });
  }

  submit(): void {
    console.log('NewForm - ', this.priceNewForm);
    if (this.priceNewForm.invalid) {
      return;
    }
    const price: Price = {
      incometype_id: this.priceNewForm.value.incometype_id,
      dtfrom: this.priceNewForm.value.dtfrom,
      dtto: this.priceNewForm.value.dtto,
      amount: this.priceNewForm.value.amount
    };
    console.log('This price (new) before save --', price);
    this.priceService.savePrice(price).subscribe(() => { this.location.back(); });
    this.priceNewForm.reset();
  }

  goBack(): void {
    this.router.navigate([this.routeBack]);
  }

  submitAndBack(): void {
    this.submit();
    this.goBack();
  }

  onIncomeTypeChange(): void {

  }
}
