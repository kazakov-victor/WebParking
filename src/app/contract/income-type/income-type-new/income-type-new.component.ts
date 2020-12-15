import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {IncomeTypeService} from '../../../services/income-type.service';
import {UnitService} from '../../../services/unit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {IncomeType} from '../../../shared/income-type';

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
  units = [];
  sub: Subscription;
  currentDate: string;
  constructor(private incomeTypeService: IncomeTypeService,
              private unitService: UnitService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {
    this.incomeTypeNewForm = this.fb.group({
      unit_id: [''],
      name: [''],
      note: [''],
    });
  }

  ngOnInit(): void {
    this.newIncomeType();
  }
  newIncomeType(): any {
    this.unitService.getUnits()
      .subscribe((units) => {
        this.units = units;
        console.log('This units --', this.units);
        this.incomeTypeNewForm.controls.unit_id.patchValue(this.units[0].unit_id);
      });
  }

  addIncomeType(): any {
    const control = this.fb.group({
      incometype_id: [''],
      unit_id: [''],
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
      unit_id: this.incomeTypeNewForm.value.unit_id,
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
