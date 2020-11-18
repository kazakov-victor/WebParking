import {Component, OnInit} from '@angular/core';
import {faAngleLeft, faChartBar, faCogs, faHandshake, faMoneyCheckAlt, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from '../start/auth/token-storage.service';

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
  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.roles = this.tokenStorage.getAuthorities();
    for (this.role of this.roles){
     // console.log(this.role);
    }
  }

}
