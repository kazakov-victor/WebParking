import {Component, OnInit} from '@angular/core';
import {faAngleLeft, faChartBar, faCogs, faCoins, faHandshake, faMoneyCheckAlt, faUser, faUsers, faBalanceScale} from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from '../../services/auth/token-storage.service';

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
  faBalanceScale = faBalanceScale;
  faCoins = faCoins;
  roles: string[];

  constructor(private tokenStorage: TokenStorageService) {}
  ngOnInit(): void {
    }
    checkRole(role: string): boolean {
      let res = false;
      if (this.tokenStorage.checkAuthority(role)) {
        res = true;
      }
      return res;
    }
}
