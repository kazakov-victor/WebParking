import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountrantPaymentComponent } from './accountrant-payment.component';

describe('AccountrantPaymentComponent', () => {
  let component: AccountrantPaymentComponent;
  let fixture: ComponentFixture<AccountrantPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountrantPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountrantPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
