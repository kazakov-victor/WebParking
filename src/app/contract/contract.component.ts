import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MenuService} from '../shared/menu.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit {
    itemMenu: number;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {

    /* получение данных из другого компонента
    this.menuService.inventoryChanged$.subscribe( itemMenu => {
      this.itemMenu = itemMenu;
    }); */
  }

}
