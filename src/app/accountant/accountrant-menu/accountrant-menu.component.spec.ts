import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountrantMenuComponent } from './accountrant-menu.component';

describe('AccountrantMenuComponent', () => {
  let component: AccountrantMenuComponent;
  let fixture: ComponentFixture<AccountrantMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountrantMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountrantMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
