import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../services/person';
import {PersonService} from '../../services/person.service';
import {ActivatedRoute} from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  personEditForm: FormGroup;
  person: Person;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private personService: PersonService) { }

  ngOnInit(): void {
    this.getPerson();
  }
  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe((person) => {
        this.person = person;
        this.personEditForm = new FormGroup({
        surname: new FormControl(this.person.surname, Validators.required),
        name: new FormControl(this.person.name, Validators.required),
        second_name: new FormControl(this.person.second_name, Validators.required),
        phone: new FormControl(this.person.phone, Validators.minLength(7)),
        address: new FormControl(this.person.address, Validators.required)
      });
      });
  }

  submit(): void {
    if (this.personEditForm.invalid){
      return;
    }
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.personService.updatePerson(this.person)
      .subscribe(() => this.goBack());
  }
}
