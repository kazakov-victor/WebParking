import {Component, OnInit} from '@angular/core';
import {faAngleLeft, faChartBar, faCogs, faHandshake, faMoneyCheckAlt, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {Subject, Subscription} from 'rxjs';

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
  roles: string[];
  private role: string;

    constructor(private tokenStorage: TokenStorageService) {
  }

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
