import {Component, Input, OnInit} from '@angular/core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {Source} from '../shared/source.interface';
import {ObservableService} from '../shared/observable.service';
import {MenuService} from '../shared/menu.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  faSignOutAlt = faSignOutAlt;
  @Input() isBigMenu;
  @Input() itemMenu;

  constructor(private observableService: ObservableService, private menuService: MenuService) {}

  ngOnInit(): void {
  }
  viewSource(): void {
    this.isBigMenu = !this.isBigMenu;
    this.observableService.addToInventory(this.isBigMenu);
    }

    setItem(item: number): void {
    this.itemMenu = item;
    console.log('item - ', this.itemMenu);
    this.observableService.addToInventory(this.itemMenu);
    }

}
