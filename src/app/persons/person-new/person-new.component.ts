import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../servises/person.service';
import {Person} from '../../servises/person';


@Component({
  selector: 'app-person-new',
  templateUrl: './person-new.component.html',
  styleUrls: ['./person-new.component.scss']
})
export class PersonNewComponent implements OnInit {
  personNewForm: FormGroup;
  person: Person;
  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personNewForm = new FormGroup({
      surname: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      second_name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.minLength(7)),
      address: new FormControl('', Validators.required)
    });

  }
  submit(): void {
    if (this.personNewForm.invalid){
      return;
    }
    const person: Person = {
      surname: this.personNewForm.value.surname.trim(),
      name: this.personNewForm.value.name.trim(),
      second_name: this.personNewForm.value.second_name.trim(),
      phone: this.personNewForm.value.phone,
      address: this.personNewForm.value.address
    };
    this.personService.addPerson(person).subscribe();
  }
}
