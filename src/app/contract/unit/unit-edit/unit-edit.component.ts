import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Unit} from '../../../shared/unit';
import {Subscription} from 'rxjs';
import {UnitService} from '../../../services/unit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import { faSave, faTimes, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-unit-edit',
  templateUrl: './unit-edit.component.html',
  styleUrls: ['./unit-edit.component.scss']
})
export class UnitEditComponent implements OnInit {
  routeBack = '/unit/list';
  visible = true;
  unitEditForm: FormGroup;
  unit: Unit;
  units: Unit[] = [];
  sub: Subscription;
  fTrash = faTrashAlt;
  fSave = faSave;
  fBack = faTimes;
  constructor(private unitService: UnitService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {
    this.unitEditForm = this.fb.group({
    unit_id: [''],
    name: [''],
    longname: [''],
    basis: [''] }); }

  ngOnInit(): void {
    this.getUnit();
  }

  getUnit(): any {
    const id = +this.route.snapshot.paramMap.get('id');
    this.unitService.getUnit(id)
      .subscribe((unitRes) => {
        this.unit = unitRes;
        this.unitEditForm = this.fb.group({
          unit_id: [this.unit.unit_id, Validators.required],
          name: [this.unit.name, Validators.required],
          longname: [this.unit.longname, Validators.required],
          basis: [this.unit.basis, Validators.required] });
      });
  }

  submit(): void {
    if (this.unitEditForm.invalid) {
      return;
    }
    const unit: Unit = {
      unit_id: this.unitEditForm.value.unit_id,
      name: this.unitEditForm.value.name,
      longname: this.unitEditForm.value.longname,
      basis: this.unitEditForm.value.basis,
    };
    this.unitService.saveUnit(unit).subscribe(() => this.goBack());
    this.unitEditForm.reset();
  }
  delete(unit: Unit): void {
    this.units = this.units.filter(u => u !== unit);
    this.unitService.deleteUnit(unit).subscribe(() => this.goBack());
  }
  goBack(): void {
    this.router.navigate([this.routeBack]);
  }
}
