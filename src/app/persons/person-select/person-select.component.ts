import {Component, Host, Input, OnInit} from '@angular/core';
import {Person} from '../../shared/person';
import {PersonService} from '../../services/person.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-person-select',
  templateUrl: './person-select.component.html',
  styleUrls: ['./person-select.component.scss'],
  /*
  viewProviders: [{ provide: ControlContainer,
                    useExisting: FormGroupDirective }] */
})
export class PersonSelectComponent implements OnInit {
  persons$: Observable<Person[]>;
  private searchTerms = new BehaviorSubject<string>('all');
  constructor(private personService: PersonService) { }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void {
    this.persons$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.personService.searchPersons(term)),
    );
  }

}
