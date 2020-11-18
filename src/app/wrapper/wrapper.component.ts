import {Component, Input, OnInit} from '@angular/core';
import {faCar, faInfo, faPhone, faRandom, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {Source} from '../shared/source.interface';
import {ObservableService} from '../shared/observable.service';
import {MenuService} from '../shared/menu.service';
import {TokenStorageService} from '../start/auth/token-storage.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  faRandom = faRandom;
  faInfo = faInfo;
  faPhone = faPhone;
  faLogo = faCar;
  @Input() isBigMenu;

  constructor(private observableService: ObservableService,
              private token: TokenStorageService) {}

  ngOnInit(): void {
  }
  viewSource(): void {
    this.isBigMenu = !this.isBigMenu;
    this.observableService.addToInventory(this.isBigMenu);
    }
  logout(): void {
    this.token.signOut();
    window.location.reload();
  }
}
