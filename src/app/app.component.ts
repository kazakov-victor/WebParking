import {Component, OnInit} from '@angular/core';
import { faCogs, faUser, faUsers} from '@fortawesome/free-solid-svg-icons';
import { slideInAnimation } from './animations';
import {ObservableService} from './shared/observable.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ slideInAnimation ]
})
export class AppComponent implements OnInit{
  title = 'WebParking';
  faUser = faUser;
  faUsers = faUsers;
  faGear = faCogs;
  isBigMenu: boolean;

  constructor(private observableService: ObservableService) {
  }
  ngOnInit(): void {
    this.observableService.inventoryChanged$.subscribe( article => {
      this.isBigMenu = article;
    });
  }
}
