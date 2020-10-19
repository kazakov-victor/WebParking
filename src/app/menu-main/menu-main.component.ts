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
  @Input() itemMenu;
  /*

  viewSource(): void {
    this.isBigMenu = !this.isBigMenu;
    console.log('article - ', this.isBigMenu);
    this.observableService.addToInventory(this.isBigMenu);
    }
   */

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
  }
  setItemMenu(item: number): void{
    console.log('item - ', item);
    this.menuService.addToInventory(this.itemMenu);
  }
}
