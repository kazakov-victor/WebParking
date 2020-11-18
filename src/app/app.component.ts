import {Component, OnInit} from '@angular/core';
import { faCogs, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import {ObservableService} from './shared/observable.service';
import {TokenStorageService} from './start/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [  ]
})
export class AppComponent implements OnInit{
  title = 'WebParking';
  faUser = faUser;
  faUsers = faUsers;
  faGear = faCogs;
  roles: string[];
  authority: string;
  info: any;
  constructor( private tokenStorage: TokenStorageService) {
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_PM') {
          this.authority = 'pm';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
}
