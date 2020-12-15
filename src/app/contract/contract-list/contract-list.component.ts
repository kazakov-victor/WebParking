import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ContractService} from '../../services/contract.service';
import {Contract} from '../../shared/contract';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  contracts$: Observable<Contract[]>;
  contracts: Contract[] = [];
  fEdit = faEdit;
  fTrash = faTrashAlt;

  constructor(private contractService: ContractService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getContracts();
  }
  getContracts(): void{
    this.contracts$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.contractService.getContracts();
      })
    );
   /* this.contractService.getContracts().subscribe(response => {
      console.log('Response - ', response);
      this.contracts = response;
    });*/
  }

  edit(contractId: number): void {
    this.contractService.getContract(contractId).subscribe(() => {
        this.router.navigate(['/contract/edit/', contractId]);
      });
  }
  /*delete(contract: Contract): void {
    this.contracts = this.contracts.filter(p => p !== contract);
    this.contractService.deleteContract(contract).subscribe();
  }*/

}
