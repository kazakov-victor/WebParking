import { Component, OnInit } from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';
import {PersonService} from '../../services/person.service';
import {Person} from '../../shared/person';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss']
})
export class PersonSearchComponent  {
  /*persons$: Observable<Person []>;
  private searchTerms = new Subject<string>();
  constructor(private personService: PersonService) {}

  // Push a search term into the observable stream.
   search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
      this.persons$ = this.searchTerms.pipe(
        // startWith(this.searchTerms.next(' ')),
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => this.personService.searchPersons(term)),
      );
    }*/
  }


