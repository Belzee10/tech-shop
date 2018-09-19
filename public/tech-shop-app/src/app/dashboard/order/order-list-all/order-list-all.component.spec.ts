import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderListAllComponent } from './order-list-all.component';

describe('OrderListAllComponent', () => {
  let component: OrderListAllComponent;
  let fixture: ComponentFixture<OrderListAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderListAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderListAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
