import { Component, OnInit } from '@angular/core';
import {Saldo} from '../shared/saldo';
import {Observable} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {SaldoService} from '../services/saldo.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MessageService} from '../services/message.service';
@Component({
  selector: 'app-saldo',
  templateUrl: './saldo.component.html',
  styleUrls: ['./saldo.component.scss']
})
export class SaldoComponent implements OnInit {
  saldos$: Observable<Saldo[]>;
  messages: string[] = [];
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private saldoService: SaldoService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getSaldos();
  }
  getSaldos(): void{
    this.saldos$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.saldoService.getSaldos();
      })
    );
    this.messages = this.messageService.messages;
  }

  edit(saldoId: number): void {
    this.saldoService.getSaldo(saldoId).subscribe(() => {
      this.router.navigate(['/saldo/toggle/', saldoId]);
    });
  }
}

