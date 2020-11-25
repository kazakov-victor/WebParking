import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObservableService {
    isBigMenu = true;
    sub: Subscription;
    isBigMenu$: Subject<boolean> = new BehaviorSubject<boolean>(this.isBigMenu);

  constructor() {
    this.isBigMenu$.subscribe(value => {
      this.isBigMenu = value;
    });
  }

  next(): void {
    this.isBigMenu$.next( !this.isBigMenu);
    console.log('Observable service next() ', this.isBigMenu);
  }

}
