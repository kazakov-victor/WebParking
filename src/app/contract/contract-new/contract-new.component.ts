import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ContractService} from '../../servises/contract.service';
import {BehaviorSubject, Observable, Subject, Subscription} from 'rxjs';
import {Contract} from '../../servises/contract';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-contract-new',
  templateUrl: './contract-new.component.html',
  styleUrls: ['./contract-new.component.scss'],
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

export class ContractNewComponent implements OnInit {
  visible = true;
  contractNewForm: FormGroup;
  contracts$: Observable<Contract[]>;
  private searchTerms = new BehaviorSubject<string>('all');
  sub: Subscription;
// Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  constructor(private contractService: ContractService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contracts$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.contractService.searchContracts(term)),
    );
    this.contractNewForm = new FormGroup({
      number: new FormControl('', [
        Validators.nullValidator,
        Validators.required,
        Validators.minLength(5)
      ]),
     // contract_id: new FormControl(''),
      balance: new FormControl('', Validators.nullValidator),
      dtfrom: new FormControl(''),
      dtto: new FormControl(''),
      note: new FormControl(''),
    });

  }

  newContract(): void {
  }

  submit(): void {
    if (this.contractNewForm.invalid){
      return;
    }
    const contract: Contract = {
      number: this.contractNewForm.value.number.trim(),
      personDTO: this.contractNewForm.value.personDTO,
      balance: this.contractNewForm.value.balance,
      dtfrom: this.contractNewForm.value.dtfrom,
      dtto: this.contractNewForm.value.dtto,
      note: this.contractNewForm.value.note,
      incomes: this.contractNewForm.value.incomes.values().dtto
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

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  next(): void { }
}
