import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface ContractDTO {
  contract_id: number;
  number: number;
  balance: number;
  dtfrom: string;
  dtto: string;
  note: string;
}
@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {
  contractDTOS: ContractDTO[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ContractDTO[]>('http://localhost:8080/contract/list')
      .subscribe(response => {
        console.log('Response - ', response);
        this.contractDTOS = response;
      });
  }

}
