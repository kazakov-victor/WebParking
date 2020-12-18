import { Component, OnInit } from '@angular/core';
import {faCaretDown, faFilter} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './common-report.component.html',
  styleUrls: ['./common-report.component.scss']
})
export class CommonReportComponent implements OnInit {
  faFilter = faFilter;
  faCaretDown = faCaretDown;
  constructor() { }

  ngOnInit(): void {
  }

}
