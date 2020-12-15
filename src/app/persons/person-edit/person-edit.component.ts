import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Person} from '../../shared/person';
import {PersonService} from '../../services/person.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import {faSave, faTimes, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {
  routeBack = '/person/list';
  personEditForm: FormGroup;
  person: Person;
  persons: Person [] = [];
  fTrash = faTrashAlt;
  fSave = faSave;
  fBack = faTimes;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder,
              private personService: PersonService) {
    this.personEditForm = this.fb.group({
      person_id: [''],
      surname: [''],
      name: [''],
      second_name: [''],
      phone: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.getPerson();
  }
  getPerson(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id)
      .subscribe((person) => {
        this.person = person;
        this.personEditForm = this.fb.group({
        person_id: [this.person.person_id, Validators.required],
        surname: [this.person.surname, Validators.required],
        name: [this.person.name, Validators.required],
        second_name: [this.person.second_name, Validators.required],
        phone: [this.person.phone, Validators.minLength(7)],
        address: [this.person.address, Validators.required]
      });
      });
  }

  submit(): void {
    if (this.personEditForm.invalid){
      return;
    }
    const person: Person = {
      person_id: this.personEditForm.value.person_id,
      surname: this.personEditForm.value.surname,
      name: this.personEditForm.value.name,
      second_name: this.personEditForm.value.second_name,
      phone: this.personEditForm.value.phone,
      address: this.personEditForm.value.address,
    };
    this.personService.savePerson(person).subscribe(() => this.goBack());
    this.personEditForm.reset();
  }
  delete(person: Person): void {
    this.persons = this.persons.filter(u => u !== person);
    this.personService.deletePerson(person).subscribe(() => this.goBack());
  }
  goBack(): void {
    this.router.navigate([this.routeBack]);
  }
}

