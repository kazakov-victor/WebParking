import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Contract} from '../../shared/contract';
import {ActivatedRoute} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {ContractService} from '../../services/contract.service';
import {Income} from '../../shared/income';
import {IncomeType} from '../../shared/income-type';
import {Unit} from '../../shared/unit';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})

export class ContractEditComponent implements OnInit {
  contractEditForm: FormGroup;
  contract: Contract;
  incomes: Income [];
  incomeType: IncomeType;
  unit: Unit;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private contractService: ContractService,
              private fb: FormBuilder  ) { }

  ngOnInit(): void {
    this.getContract();
  }
   getContract(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.contractService.getContract(id)
       .subscribe((contract) => {
         this.contract = contract;
         this.incomes = this.contract.incomeDTOS;
         this.contractEditForm = this.fb.group({
           contract_id: [this.contract.contract_id, Validators.required],
           number: [this.contract.number, Validators.required],
           person: this.fb.group(
             {
               surname: [this.contract.personDTO.surname],
               name: [this.contract.personDTO.name]
             }
           ),
           balance: [this.contract.balance, Validators.required],
           dtfrom: [this.contract.dtfrom
             ? formatDate(this.contract.dtfrom, 'yyyy-MM-dd', 'en')
             : this.contract.dtfrom],
           dtto: [this.contract.dtto
             ? formatDate(this.contract.dtto, 'yyyy-MM-dd', 'en')
             : this.contract.dtto],
           note: [this.contract.note],
           incomes: this.fb.array(this.incomes.map(income => this.createIncome(income)))
         });
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
          income_type_id: [income.IncomeType.income_type_id],
          name: [income.IncomeType.name],
          note: [income.IncomeType.note],
          sid_external: [income.IncomeType.sid_external],
          unitDTO: this.fb.group(
            {
              unit_id: [income.IncomeType.unitDTO.unit_id],
              name: [income.IncomeType.unitDTO.name],
              longname: [income.IncomeType.unitDTO.longname],
              basis: [income.IncomeType.unitDTO.basis],
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
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log('Data form', this.contractEditForm.value);
    /*this.contractService.updateContract(this.contract)
      .subscribe(() => this.goBack());*/
  }
}

