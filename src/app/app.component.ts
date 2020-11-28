import {Component, OnInit} from '@angular/core';
import {ObservableService} from './services/observable.service';
import {TokenStorageService} from './services/auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [  ]
})
export class AppComponent implements OnInit {
  title = 'WebParking';
  roles: string[];
  authority: string = null;
  info: any;
  isBigMenu: boolean;

  constructor(private tokenStorage: TokenStorageService,
              private observableService: ObservableService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        } else if (role === 'ROLE_ACCOUNTANT') {
          this.authority = 'accountant';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
    this.observableService.isBigMenu$.subscribe(value => {
      this.isBigMenu = value;
    });
  }
}
