import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPermissionsComponent } from './not-permissions.component';

describe('NotPermissionsComponent', () => {
  let component: NotPermissionsComponent;
  let fixture: ComponentFixture<NotPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
