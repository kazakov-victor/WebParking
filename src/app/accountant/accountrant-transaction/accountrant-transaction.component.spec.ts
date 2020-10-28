import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountrantTransactionComponent } from './accountrant-transaction.component';

describe('AccountrantTransactionComponent', () => {
  let component: AccountrantTransactionComponent;
  let fixture: ComponentFixture<AccountrantTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountrantTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountrantTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
