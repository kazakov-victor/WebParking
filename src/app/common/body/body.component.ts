import { Component, OnInit } from '@angular/core';
import {ObservableService} from '../../services/observable.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  isBigMenu: Subject<boolean>;
  constructor(private observableService: ObservableService) { }

  ngOnInit(): void {
    this.isBigMenu = this.observableService.isBigMenu$;
    console.log('From body is Big = ', this.isBigMenu);
     }

}
