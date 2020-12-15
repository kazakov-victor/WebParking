import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contract} from '../../shared/contract';
import {ActivatedRoute, Router} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {ContractService} from '../../services/contract.service';
import {Income} from '../../shared/income';
import {IncomeType} from '../../shared/income-type';
import {Unit} from '../../shared/unit';
import {faEdit, faSave, faTimes, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})

export class ContractEditComponent implements OnInit {
  contractEditForm: FormGroup;
  contract: Contract;
  incomeType: IncomeType;
  unit: Unit;
  routeBack = '/income/list';
  visible = true;
  incomes = [];
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
              private fb: FormBuilder  ) {
    this.contractEditForm = this.fb.group({
      contract_id: [''],
      number: [''],
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
      incomes: this.fb.array(this.incomes.map(income => this.createIncome(income)))
    });
  }

  ngOnInit(): void {
    this.getContract();
  }
   getContract(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.contractService.getContract(id)
       .subscribe((contract) => {
         this.contract = contract;
         this.incomes = this.contract.incomes;
         this.contractEditForm = this.fb.group({
           contract_id: [this.contract.contract_id, Validators.required],
           number: [this.contract.number, Validators.required],
       /*    person: this.fb.group(
             {
               surname: [this.contract.person.surname],
               name: [this.contract.person.name]
             }
           ),*/
           balance: [this.contract.balance, Validators.required],
           dtfrom: [this.contract.dtfrom
             ? formatDate(this.contract.dtfrom, 'yyyy-MM-dd', 'en')
             : this.contract.dtfrom],
           dtto: [this.contract.dtto
             ? formatDate(this.contract.dtto, 'yyyy-MM-dd', 'en')
             : this.contract.dtto],
           note: [this.contract.note],
           /*incomes: this.fb.array(this.incomes.map(income => this.createIncome(income)))
        */ });
       });
   }

  createIncome(income): FormGroup {
    console.log('income', income);
    return this.fb.group({
      dtfrom: [income.dtfrom ? formatDate(income.dtfrom, 'yyyy-MM-dd', 'en')
        : income.dtfrom],
      dtto: [income.dtto ? formatDate(income.dtto, 'yyyy-MM-dd', 'en')
        : income.dtto],
      income_id: [income.income_id],
      quantity: [income.quantity],
      IncomeType: this.fb.group(
        {
          incometype_id: [income.IncomeType.incometype_id],
          name: [income.IncomeType.name],
          note: [income.IncomeType.note],
          sid_external: [income.IncomeType.sid_external],
          unitDTO: this.fb.group(
            {
              unit_id: [income.IncomeType.unit.unit_id],
              name: [income.IncomeType.unit.name],
              longname: [income.IncomeType.unit.longname],
              basis: [income.IncomeType.unit.basis],
            }
          )
        }
      )
    });
  }

  submit(): void {
    if (this.contractEditForm.invalid) {
      return;
    }
    const contract: Contract = {
      contract_id: this.contractEditForm.value.contract_id,
      number: this.contractEditForm.value.number,
      person_id: this.contractEditForm.value.person_id,
    /*  person: this.contractEditForm.group(
        {
          surname: this.contractEditForm.value.person.surname,
          name: this.contractEditForm.value.person.name
        }),*/
      balance: this.contractEditForm.value.balance,
      dtfrom: this.contractEditForm.value.dtfrom,
      dtto: this.contractEditForm.value.dtto,
      note: this.contractEditForm.value.note,
      incomes: this.contractEditForm.value.incomes
    };
    this.contractService.saveContract(contract)
      .subscribe(() => this.goBack());
    this.contractEditForm.reset();
  }

  goBack(): void {
    this.router.navigate([this.routeBack]);
  }

  save(): void {
    console.log('Data form', this.contractEditForm.value);
    /*this.contractService.updateContract(this.contract)
      .subscribe(() => this.goBack());*/
  }
}

