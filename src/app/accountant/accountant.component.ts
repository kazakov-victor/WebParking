import { Component, OnInit } from '@angular/core';
import {MenuService} from '../shared/menu.service';

@Component({
  selector: 'app-accountant',
  templateUrl: './accountant.component.html',
  styleUrls: ['./accountant.component.scss']
})
export class AccountantComponent implements OnInit {
  itemMenu: number;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
  this.menuService.inventoryChanged$.subscribe( itemMenu => {
    this.itemMenu = itemMenu;
  });
  }

}
