import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Contract} from '../../servises/contract';
import {ActivatedRoute} from '@angular/router';
import {formatDate, Location} from '@angular/common';
import {ContractService} from '../../servises/contract.service';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})

export class ContractEditComponent implements OnInit {
  contractEditForm: FormGroup;
  contract: Contract;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private contractService: ContractService) { }

  ngOnInit(): void {
    this.getContract();
  }
   getContract(): void {
     const id = +this.route.snapshot.paramMap.get('id');
     this.contractService.getContract(id)
       .subscribe((contract) => {
         this.contract = contract;
         this.contractEditForm = new FormGroup({
           contract_id: new FormControl(this.contract.contract_id, Validators.required),
           number: new FormControl(this.contract.number, Validators.required),
           person: new FormGroup(
             {surname: new FormControl(this.contract.personDTO.surname),
                      name: new FormControl(this.contract.personDTO.name)
             }
       ),

           balance: new FormControl(this.contract.balance, Validators.required),
           dtfrom: new FormControl(this.contract.dtfrom
             ? formatDate(this.contract.dtfrom, 'yyyy-MM-dd', 'en')
             : this.contract.dtfrom),
           dtto: new FormControl(this.contract.dtto
             ? formatDate(this.contract.dtto, 'yyyy-MM-dd', 'en')
             : this.contract.dtto),
           note: new FormControl(this.contract.note),
           /*incomes: new FormGroup(
             {quantity: new FormControl(this.contract.incomes),
               name: new FormControl(this.contract.incomes.forEach())
             }
           ),*/
         });

  });
  }

  submit(): void {
    if (this.contractEditForm.invalid){
      return;
    }
  }
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.contractService.updateContract(this.contract)
      .subscribe(() => this.goBack());
  }
}

