import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGetwayComponent } from './payment-getway.component';

describe('PaymentGetwayComponent', () => {
  let component: PaymentGetwayComponent;
  let fixture: ComponentFixture<PaymentGetwayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentGetwayComponent]
    });
    fixture = TestBed.createComponent(PaymentGetwayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
