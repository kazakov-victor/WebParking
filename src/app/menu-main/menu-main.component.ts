import {Component, Input, OnInit} from '@angular/core';
import {faAngleLeft, faChartBar, faCogs, faHandshake, faMoneyCheckAlt, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {Subject, Subscription} from 'rxjs';
import {MenuService} from '../shared/menu.service';

@Component({
  selector: 'app-menu-main',
  templateUrl: './menu-main.component.html',
  styleUrls: ['./menu-main.component.scss']
})
export class MenuMainComponent implements OnInit {
  faAngleLeft = faAngleLeft;
  faHandShake = faHandshake;
  faMoneyCheckAlt = faMoneyCheckAlt;
  faChartBar = faChartBar;
  faUser = faUser;
  faUsers = faUsers;
  faGear = faCogs;
  itemMenu: number;

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.inventoryChanged$.subscribe( itemMenu => {
      this.itemMenu = itemMenu;
    });
  }
  setItemMenu(item: number): void{
    console.log('item - ', item);
    this.menuService.addToInventory(item);
  }
}
