import { Component, OnInit } from '@angular/core';
import {faAngleLeft, faChartBar, faCogs, faUsers} from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from '../../services/auth/token-storage.service';

@Component({
  selector: 'app-menu-account',
  templateUrl: './menu-account.component.html',
  styleUrls: ['./menu-account.component.scss']
})
export class MenuAccountComponent implements OnInit {
  faUsers = faUsers;
  faChartBar = faChartBar;
  faAngleLeft = faAngleLeft;
  faGear = faCogs;
  roles: string[];
  username: string;

  constructor(private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.username = this.tokenStorage.getUsername();
  }
}
