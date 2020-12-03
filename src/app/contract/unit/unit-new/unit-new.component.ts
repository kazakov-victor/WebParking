import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {Unit} from '../../../shared/unit';
import {UnitService} from '../../../services/unit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {faSave, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-unit-new',
  templateUrl: './unit-new.component.html',
  styleUrls: ['./unit-new.component.scss']
})
export class UnitNewComponent implements OnInit {
  visible = true;
  unitNewForm: FormGroup;
  sub: Subscription;
  routeBack = '/unit/list';
  fSave = faSave;
  fBack = faTimes;
  constructor(private unitService: UnitService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.unitNewForm = this.fb.group({
      name: ['', Validators.required],
      longname: ['', Validators.required],
      basis: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.unitNewForm.invalid) {
      return;
    }
    const unit: Unit = {
      name: this.unitNewForm.value.name,
      longname: this.unitNewForm.value.longname,
      basis: this.unitNewForm.value.basis,
    };
    this.unitService.saveUnit(unit).subscribe(() => this.goBack() );
    this.unitNewForm.reset();
  }
  goBack(): void {
    this.router.navigate([this.routeBack]);
  }
}
