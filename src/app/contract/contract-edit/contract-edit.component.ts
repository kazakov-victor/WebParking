import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Contract} from '../../shared/contract';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {ContractService} from '../../services/contract.service';
import {Income} from '../../shared/income';
import {IncomeType} from '../../shared/income-type';
import {faEdit, faSave, faTimes, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Person} from '../../shared/person';
import {PersonService} from '../../services/person.service';
import {IncomeTypeService} from '../../services/income-type.service';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})

export class ContractEditComponent implements OnInit {
  contractEditForm: FormGroup;
  contract: Contract;
  currentDate: string;
  incomeType: IncomeType;
  persons: Person[];
  routeBack = '/contract/list';
  visible = true;
  contracts = [];
  incometypes = [];
  income: Income;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  fSave = faSave;
  fBack = faTimes;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private contractService: ContractService,
              private incomeTypeService: IncomeTypeService,
              private personService: PersonService,
              private fb: FormBuilder  ) {
    this.contractEditForm = this.fb.group({
      contract_id: [''],
      number: [''],
      person_id:  [''],
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
      //  this.contractEditForm.controls.person_id.patchValue(this.persons[0].person_id);
      });
    this.incomeTypeService.getIncomeTypes()
      .subscribe((incometype) => {
        this.incometypes = incometype;
      });
    this.getContract();
  }
   getContract(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.contractService.getContract(id)
       .subscribe((contract) => {
         this.contract = contract;
         console.log('this.contract', this.contract);
      //   this.incomes = this.contract.incomes;
         this.contractEditForm = this.fb.group({
           contract_id: [this.contract.contract_id, Validators.required],
           number: [this.contract.number, Validators.required],
           person_id: [this.contract.person_id],
           balance: [this.contract.balance, Validators.required],
           dtfrom: [this.contract.dtfrom
             ? formatDate(this.contract.dtfrom, 'yyyy-MM-dd', 'en')
             : this.contract.dtfrom],
           dtto: [this.contract.dtto
             ? formatDate(this.contract.dtto, 'yyyy-MM-dd', 'en')
             : this.contract.dtto],
           note: [this.contract.note],
           incomes: this.fb.array(this.contract.incomes.map(income => this.showIncome(income)))
         });
       });
   }

  incomes(): FormArray {
    return this.contractEditForm.get('incomes') as FormArray;
  }

  newIncome(): FormGroup {
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

  showIncome(income): FormGroup {
    console.log('income', income);
    return this.fb.group({
      dtfrom: [income.dtfrom ? formatDate(income.dtfrom, 'yyyy-MM-dd', 'en')
        : income.dtfrom],
      dtto: [income.dtto ? formatDate(income.dtto, 'yyyy-MM-dd', 'en')
        : income.dtto],
      income_id: [income.income_id],
      quantity: [income.quantity],
      incometype_id: [income.incometype_id],
    });
  }

  submit(): void {
    if (this.contractEditForm.invalid) {
      return;
    }

    this.contractService.saveContract(this.contractEditForm.value)
      .subscribe(() => this.goBack());
    this.contractEditForm.reset();
  }

  goBack(): void {
    this.router.navigate([this.routeBack]);
  }
}

