import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Price} from '../../shared/price';
import {Subscription} from 'rxjs';
import {faEdit, faSave, faTimes, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PriceService} from '../../services/price.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {IncomeType} from '../../shared/income-type';
import {IncomeTypeService} from '../../services/income-type.service';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.scss']
})
export class PriceEditComponent implements OnInit, OnDestroy {
  routeBack = '/price/list';
  visible = true;
  priceEditForm: FormGroup;
  prices = [];
  incometypes = [];
  price: Price;
  sub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  fSave = faSave;
  fBack = faTimes;

  constructor(private priceService: PriceService,
              private incomeTypeService: IncomeTypeService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {
    this.priceEditForm = this.fb.group({
      price_id: [''],
      incometype_id: [''],
      dtfrom: [''],
      dtto: [''],
      amount: [''],
    });
  }

  ngOnInit(): void {
    this.getPrice();
  }

  getPrice(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.priceService.getPrice(id)
      .subscribe((price) => {
        this.price = price;
        this.priceEditForm.controls.price_id.patchValue(this.price.price_id);
        this.priceEditForm.controls.incometype_id.patchValue(this.price.incometype_id);
        this.priceEditForm.controls.dtfrom.patchValue(this.price.dtfrom);
        this.priceEditForm.controls.dtto.patchValue(this.price.dtto);
        this.priceEditForm.controls.amount.patchValue(this.price.amount);
      });
    this.priceService.getPrices()
      .subscribe((types) => {
        this.prices = types;
        this.priceEditForm.controls.price_id.patchValue(this.price.price_id);
      });
    this.incomeTypeService.getIncomeTypes()
      .subscribe((incometypes) => {
        this.incometypes = incometypes;
        console.log('this.incometypes - ', this.incometypes);
      //  this.priceEditForm.controls.incometype_id.patchValue(this.price.incometype_id);
      });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  submit(): void {
    if (this.priceEditForm.invalid) {
      return;
    }
    console.log('Value - ', this.priceEditForm.value);
    const price: Price = {
      price_id: this.priceEditForm.value.price_id,
      incometype_id: this.priceEditForm.value.incometype_id,
      dtfrom: this.priceEditForm.value.dtfrom,
      dtto: this.priceEditForm.value.dtto,
      amount: this.priceEditForm.value.amount
    };
    this.priceService.savePrice(price)
      .subscribe(() => this.goBack());
    this.priceEditForm.reset();
  }

  delete(price: Price): void {
    this.prices = this.prices.filter(p => p !== price);
    this.priceService.deletePrice(price).subscribe(() => this.goBack());
  }
  goBack(): void {
    this.router.navigate([this.routeBack]);
  }
}

