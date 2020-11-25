import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ContractService} from '../../services/contract.service';
import {Contract} from '../../shared/contract';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit, OnDestroy {
  contracts: Contract[] = [];
  pSub: Subscription;
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private contractService: ContractService) { }

  ngOnInit(): void {
    this.getContracts();
  }
  getContracts(): void{
    this.contractService.getContracts().subscribe(response => {
      console.log('Response - ', response);
      this.contracts = response;
    });
  }

  ngOnDestroy(): void {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

  edit(contractId: number): void {
    this.contractService.getContract(contractId).subscribe();
  }
  delete(contract: Contract): void {
    this.contracts = this.contracts.filter(p => p !== contract);
    this.contractService.deleteContract(contract).subscribe();
  }

}
