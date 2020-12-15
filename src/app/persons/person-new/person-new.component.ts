import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonService} from '../../services/person.service';
import {Person} from '../../shared/person';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {faSave, faTimes} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-person-new',
  templateUrl: './person-new.component.html',
  styleUrls: ['./person-new.component.scss']
})
export class PersonNewComponent implements OnInit {
  visible = true;
  personNewForm: FormGroup;
  person: Person;
  routeBack = '/person/list';
  fSave = faSave;
  fBack = faTimes;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder,
              private personService: PersonService) { }

  ngOnInit(): void {
    this.personNewForm = this.fb.group({
      surname: ['', Validators.required],
      name: ['', Validators.required],
      second_name: ['', Validators.required],
      phone: ['', Validators.minLength(7)],
      address: ['', Validators.required]
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
    this.personService.savePerson(person).subscribe(() => this.goBack());
    this.personNewForm.reset();
  }


  goBack(): void {
    this.router.navigate([this.routeBack]);
  }

  submitAndBack(): void {
    this.submit();
    this.goBack();
  }
}
