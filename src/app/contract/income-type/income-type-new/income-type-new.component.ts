import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IncomeTypeService} from '../../../services/income-type.service';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {IncomeType} from '../../../shared/income-type';
import {BasisService} from '../../../services/basis.service';

@Component({
  selector: 'app-income-type-new',
  templateUrl: './income-type-new.component.html',
  styleUrls: ['./income-type-new.component.scss']
})
export class IncomeTypeNewComponent implements OnInit {
  routeBack = '/incometype/list';
  visible = true;
  incomeTypeNewForm: FormGroup;
  incometypes = [];
  basises: string[];
  sub: Subscription;
  currentDate: string;
  constructor(private incomeTypeService: IncomeTypeService,
              private basisService: BasisService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {
    this.incomeTypeNewForm = this.fb.group({
      basis: [''],
      name: [''],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.newIncomeType();
  }
  newIncomeType(): any {
    this.basisService.getBasises()
      .subscribe((basises) => {
        this.basises = basises;
        this.incomeTypeNewForm.controls.basises.patchValue(this.basises);
      });
  }

  addIncomeType(): any {
    const control = this.fb.group({
      incometype_id: [''],
      basis: [''],
      name: [''],
      note: ['']
    });
  }

  submit(): void {
    console.log('NewForm - ', this.incomeTypeNewForm);
    if (this.incomeTypeNewForm.invalid) {
      return;
    }
    const incomeType: IncomeType = {
      basis: this.incomeTypeNewForm.value.basis,
      name: this.incomeTypeNewForm.value.name,
      note: this.incomeTypeNewForm.value.note
    };
    console.log('This incomeType (new) before save --', incomeType);
    this.incomeTypeService.saveIncomeType(incomeType).subscribe(() => { this.location.back(); });
    this.incomeTypeNewForm.reset();
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
