import { Component, OnInit } from '@angular/core';
import {faCaretDown, faFilter} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faFilter = faFilter;
  faCaretDown = faCaretDown;
  constructor() { }

  ngOnInit(): void {
  }

}
