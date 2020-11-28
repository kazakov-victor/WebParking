import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ContractService} from '../../services/contract.service';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {Contract} from '../../shared/contract';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Income} from '../../shared/income';
import {Person} from '../../shared/person';
import {IncomeTypeDTO} from '../../shared/income-type';
import {IncomeTypeService} from '../../services/income-type.service';

@Component({
  selector: 'app-contract-new',
  templateUrl: './contract-new.component.html',
  styleUrls: ['./contract-new.component.scss'],
  animations: [
    trigger('popup-window', [
      /*state('start', style({ background: 'blue' })),
      state('end', style({
        background: 'red',
        transform: 'scale(1.2)'
      })),
      state('special', style({
        background: 'orange',
        transform: 'scale(0.5)',
        borderRadius: '50%'
      })),*/
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

export class ContractNewComponent implements OnInit {
  visible = true;
  income: Income;
  contractNewForm: FormGroup;
  persons$: Observable<Person[]>;
  contracts$: Observable<Contract[]>;
  incomeTypes$: Observable<IncomeTypeDTO[]>;
  private searchTerms = new BehaviorSubject<string>('all');
  sub: Subscription;

// Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(private contractService: ContractService,
              private incomeTypeService: IncomeTypeService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
     this.incomeTypes$ = this.incomeTypeService.getIncomeTypes();
     this.contracts$ = this.searchTerms.pipe(
       // wait 300ms after each keystroke before considering the term
       debounceTime(300),
       // ignore new term if same as previous term
       distinctUntilChanged(),
       // switch to new search observable each time the term changes
       switchMap((term: string) => this.contractService.searchContracts(term)),
     );

     this.contractNewForm = this.fb.group({
      contract_id: ['', Validators.required],
      number: ['', Validators.required],
      person: this.fb.group(
        {
          surname: [''],
          name: ['']
        }
      ),
      balance: [''],
      dtfrom: [''],
      dtto: [''],
      note: [''],
      incomes: this.fb.array([])
    });
  }

  addIncome(): any {
    const control = this.fb.group({
      dtfrom: [''],
      dtto: [''],
      income_id: [''],
      quantity: [''],
      incomeTypeDTO: [1]
    });

        /* this.fb.group(
        {
          income_type_id: [''],
          name: [''],
          note: [''],
          sid_external: [''],
          unitDTO: this.fb.group(
            {
              unit_id: [''],
              name: [''],
              longname: [''],
              basis: [''],
            }
          )
        }
      )*/

    (this.contractNewForm.get('incomes') as FormArray).push(control);
  }


newContract(): void {
  }

submit(): void {
    if (this.contractNewForm.invalid) {
      return;
    }
    const contract: Contract = {
      number: this.contractNewForm.value.number.trim(),
      personDTO: this.contractNewForm.value.personDTO,
      balance: this.contractNewForm.value.balance,
      dtfrom: this.contractNewForm.value.dtfrom,
      dtto: this.contractNewForm.value.dtto,
      note: this.contractNewForm.value.note,
      incomeDTOS: this.contractNewForm.value.incomes.values().dtto
    };
    this.contractService.addContract(contract).subscribe();
    this.contractNewForm.reset();
  }


goBack(): void {
    this.location.back();
  }

submitAndBack(): void {
    this.submit();
    this.goBack();
  }

addPerson(): void {

  }

  onIncomeTypeChange(): void {

  }

}
