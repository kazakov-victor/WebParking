import { Component, OnInit } from '@angular/core';
import {Person} from '../shared/person';
import {PersonService} from '../services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.scss']
})
export class PersonsComponent implements OnInit {

  persons: Person[];

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPersons();
  }

  getPersons(): void {
    this.personService.getPersons()
      .subscribe(persons => this.persons = persons);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.personService.addPerson({ name } as Person)
      .subscribe(person => {
        this.persons.push(person);
      });
  }

  delete(person: Person): void {
    this.persons = this.persons.filter(h => h !== person);
    this.personService.deletePerson(person).subscribe();
  }

}
