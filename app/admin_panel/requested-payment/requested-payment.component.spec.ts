import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestedPaymentComponent } from './requested-payment.component';

describe('RequestedPaymentComponent', () => {
  let component: RequestedPaymentComponent;
  let fixture: ComponentFixture<RequestedPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestedPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestedPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
