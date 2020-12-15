import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, style, transition, trigger} from '@angular/animations';
import {ContractService} from '../../services/contract.service';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {Contract} from '../../shared/contract';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {Income} from '../../shared/income';
import {Person} from '../../shared/person';
import {IncomeType} from '../../shared/income-type';
import {IncomeTypeService} from '../../services/income-type.service';
import {PersonService} from '../../services/person.service';
import {IncomeService} from '../../services/income.service';
import {faSave, faTimes} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contract-new',
  templateUrl: './contract-new.component.html',
  styleUrls: ['./contract-new.component.scss'],
  animations: [
    trigger('popup-window', [
      transition(':enter', [
        style({opacity: 0}),
        animate('850ms ease-out')
      ]),
      transition(':leave', [
        style({opacity: 1}),
        animate(750, style({
          opacity: 0
        }))
      ])
    ])
  ]
})

export class ContractNewComponent implements OnInit {
  routeBack = '/contract/list';
  visible = true;
  incometypes: IncomeType[];
  persons: Person[];
  contract: Contract;
  contractNewForm: FormGroup;
  currentDate: string;
  fSave = faSave;
  fBack = faTimes;
  private searchTerms = new BehaviorSubject<string>('all');

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  constructor(private contractService: ContractService,
              private incomeService: IncomeService,
              private incomeTypeService: IncomeTypeService,
              private personService: PersonService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private fb: FormBuilder) {
    this.contractNewForm = this.fb.group({
      number: ['', Validators.required],
      person_id: [''],
      balance: [''],
      dtfrom: [''],
      dtto: [''],
      note: [''],
      incomes: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.personService.getPersons()
      .subscribe((persons) => {
        this.persons = persons;
        this.contractNewForm.controls.person_id.patchValue(this.persons[0].person_id);
      });
    this.incomeTypeService.getIncomeTypes()
      .subscribe((incometype) => {
        this.incometypes = incometype;
      });
    this.currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    this.contractNewForm.controls.dtfrom.patchValue(this.currentDate);
    /* this.contracts$ = this.searchTerms.pipe(
       // wait 300ms after each keystroke before considering the term
       debounceTime(300),
       // ignore new term if same as previous term
       distinctUntilChanged(),
       // switch to new search observable each time the term changes
       switchMap((term: string) => this.contractService.searchContracts(term)),
     );*/
    /*this.incomeService.getIncomes()
      .subscribe((incomes) => {
        this.incomesCurrent = incomes;
        console.log('This incomes --', this.incomesCurrent);
        this.contractNewForm.setControl('incomes', this.fb.array(this.incomesCurrent));
        // this.productForm.setControl('tags', this.fb.array(this.product.tags || []));
      });
    this.addIncome();*/
  }

  incomes(): FormArray {
    return this.contractNewForm.get('incomes') as FormArray;
  }

  newIncome(): FormGroup {
    console.log('id -', this.incometypes[0].incometype_id);
    return this.fb.group({
      dtfrom: this.currentDate,
      dtto: '',
      quantity: '',
      incometype_id: this.incometypes[0].incometype_id
    });
  }

  addIncome(): any {
    this.incomes().push(this.newIncome());
  }

  removeIncome(incomeIndex: number): any {
    this.incomes().removeAt(incomeIndex);
  }

  submit(): void {
    if (this.contractNewForm.invalid) {
      return;
    }
    this.contractService.saveContract(this.contractNewForm.value).subscribe();
    // this.contractNewForm.reset();
  }

  goBack(): void {
    this.router.navigate([this.routeBack]);
  }

}
