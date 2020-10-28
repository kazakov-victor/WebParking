import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountrantCasflowComponent } from './accountrant-casflow.component';

describe('AccountrantCasflowComponent', () => {
  let component: AccountrantCasflowComponent;
  let fixture: ComponentFixture<AccountrantCasflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountrantCasflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountrantCasflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
