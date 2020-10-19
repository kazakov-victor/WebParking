import {Component, Input, OnInit} from '@angular/core';
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
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {

    @Input() sheetChoice = 3;
    contractDTOS: ContractDTO[] = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ContractDTO[]>('http://localhost:8080/contractlist')
      .subscribe(response => {
        console.log('Response - ', response);
        this.contractDTOS = response;
      });
  }

}
