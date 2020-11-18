import { Component, OnInit } from '@angular/core';
import {ObservableService} from '../shared/observable.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  isBigMenu: boolean;
  constructor(private observableService: ObservableService) { }

  ngOnInit(): void {
    this.observableService.inventoryChanged$.subscribe( article => {
      this.isBigMenu = article;
    });
  }

}
