import {Component, OnInit} from '@angular/core';
import {Unit} from '../../../shared/unit';
import {Observable} from 'rxjs';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {UnitService} from '../../../services/unit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MessageService} from '../../../services/message.service';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {
  units$: Observable<Unit[]>;
  messages: string[] = [];
  fEdit = faEdit;
  fTrash = faTrashAlt;
  constructor(private unitService: UnitService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.getUnits();
  }
  getUnits(): void{
    this.units$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.unitService.getUnits();
      })
    );
    this.messages = this.messageService.messages;
  }

  edit(unitId: number): void {
    this.unitService.getUnit(unitId).subscribe(() => {
      this.router.navigate(['/unit/edit/', unitId]);
    });
  }
}
