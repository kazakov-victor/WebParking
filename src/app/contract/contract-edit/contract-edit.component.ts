import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {Person} from '../../servises/person';
import {PersonService} from '../../servises/person.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss'],
  animations: [
    trigger('popup-window', [
      state('start', style({ background: 'blue' })),
      state('end', style({
        background: 'red',
        transform: 'scale(1.2)'
      })),
      state('special', style({
        background: 'orange',
        transform: 'scale(0.5)',
        borderRadius: '50%'
      })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('850ms ease-out')
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(750, style({
          opacity: 0,
          // transform: 'scale(1.2)'
        }))
      ])
    ])
  ]
})

export class ContractEditComponent implements OnInit {
  visible = true;
  contractEditForm: FormGroup;
  persons$: Observable<Person[]>;
  private searchTerms = new BehaviorSubject<string>('all');
  sub: Subscription;
// Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  constructor(private personService: PersonService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contractEditForm = new FormGroup({
      contract_id: new FormControl('', Validators.required),
      number: new FormControl('1', [
        Validators.nullValidator,
        Validators.required,
        Validators.minLength(5)
      ]),
      person_id: new FormControl(''),
      balance: new FormControl('', Validators.nullValidator),
      dtfrom: new FormControl(''),
      dtto: new FormControl(''),
      note: new FormControl(''),
    });

  }

  submit(): void {
    console.log('Form submitted', this.contractEditForm);
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  next(): void { }
}
