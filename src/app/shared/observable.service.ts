import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
  latestBigMenu: boolean;
  // @ts-ignore
  private inventorySubject$ = new BehaviorSubject<boolean>(this.latestBigMenu);
  inventoryChanged$ = this.inventorySubject$.asObservable();

  constructor() { }

  addToInventory(isBigMenu: boolean): void{
    this.latestBigMenu = isBigMenu;
    this.inventorySubject$.next(isBigMenu);
  }
}
