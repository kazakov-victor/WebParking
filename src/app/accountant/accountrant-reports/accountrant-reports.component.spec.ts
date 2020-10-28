import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountrantReportsComponent } from './accountrant-reports.component';

describe('AccountrantReportsComponent', () => {
  let component: AccountrantReportsComponent;
  let fixture: ComponentFixture<AccountrantReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountrantReportsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountrantReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
