import { Component, OnInit } from '@angular/core';
import {Balance} from '../shared/balance';
import {Observable} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {BalanceService} from '../services/balance.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MessageService} from '../services/message.service';
@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  balances$: Observable<Balance[]>;
  messages: string[] = [];
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private balanceService: BalanceService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getBalances();
  }
  getBalances(): void{
    this.balances$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.balanceService.getBalances();
      })
    );
    this.messages = this.messageService.messages;
  }

  edit(balanceId: number): void {
    this.balanceService.getBalance(balanceId).subscribe(() => {
      this.router.navigate(['/balance/toggle/', balanceId]);
    });
  }
}
