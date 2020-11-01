import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonService} from '../../servises/person.service';
import {Person} from '../../servises/person';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit, OnDestroy {
  persons: Person[] = [];
  pSub: Subscription;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.getPersons();
  }
  getPersons(): void{
    this.personService.getPersons().subscribe(response => {
      console.log('Response - ', response);
      this.persons = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  edit(personId: number): void {
    this.personService.getPerson(personId).subscribe();
  }
  delete(person: Person): void {
    this.persons = this.persons.filter(p => p !== person);
    this.personService.deletePerson(person).subscribe();
  }
}
