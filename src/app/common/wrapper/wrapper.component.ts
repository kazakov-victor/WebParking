import {Component, Input, OnInit} from '@angular/core';
import {faCar, faInfo, faPhone, faRandom, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import {Source} from '../../shared/source.interface';
import {ObservableService} from '../../services/observable.service';
import {MenuService} from '../../shared/menu.service';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';

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
  constructor(private observableService: ObservableService,
              private token: TokenStorageService,
              private router: Router) {  }

  ngOnInit(): void {
    this.router.navigate(['/main']);
  }

  logout(): void {
    this.token.signOut();
    this.router.navigate(['auth/login']);
    window.location.reload();
  }

  toggle(): void {
    this.observableService.next();
  }
}
