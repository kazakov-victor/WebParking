import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  latestItemMenu: number;
  // @ts-ignore
  private inventorySubject$ = new BehaviorSubject<number>(this.latestItemMenu);
  inventoryChanged$ = this.inventorySubject$.asObservable();

  constructor() { }

  addToInventory(itemMenu: number): void{
    this.latestItemMenu = itemMenu;
    this.inventorySubject$.next(itemMenu);
  }
}
