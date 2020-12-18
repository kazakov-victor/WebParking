import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Price} from '../../shared/price';
import {faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {PriceService} from '../../services/price.service';
import {UnitService} from '../../services/unit.service';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit {
  prices$: Observable<Price[]>;
  prices: Price[] = [];
  fEdit = faEdit;
  fTrash = faTrashAlt;

  constructor(private priceService: PriceService,
              private unitService: UnitService,
              private route: ActivatedRoute,
              private router: Router) {  }

  ngOnInit(): void {
    this.getPrices();
  }
  getPrices(): void{
    this.prices$ = this.route.paramMap.pipe(
      switchMap(params => {
        return this.priceService.getPrices();
      })
    );
  }

  edit(priceId: number): void {
    this.priceService.getPrice(priceId).subscribe(() => {
      this.router.navigate(['/price/toggle/', priceId]);
    });
  }
}
