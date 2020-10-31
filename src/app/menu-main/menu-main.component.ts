import {Component, OnInit} from '@angular/core';
import {faAngleLeft, faChartBar, faCogs, faHandshake, faMoneyCheckAlt, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';

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

  constructor() { }

  ngOnInit(): void {

  }

}
