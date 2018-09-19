import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardDetailsComponent } from './product-card-details.component';

describe('ProductCardDetailsComponent', () => {
  let component: ProductCardDetailsComponent;
  let fixture: ComponentFixture<ProductCardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductCardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
