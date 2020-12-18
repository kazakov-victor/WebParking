import {Component, OnDestroy, OnInit} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {Person} from '../../shared/person';
import {Observable, Subscription} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.scss']
})
export class PersonListComponent implements OnInit {
  persons$: Observable<Person[]>;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getPersons();
  }
  getPersons(): void{
    this.persons$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.personService.getPersons();
      })
    );
  }

  edit(personId: number): void {
    this.personService.getPerson(personId).subscribe(() => {
      this.router.navigate(['/person/toggle/', personId]);
    });
  }
}
