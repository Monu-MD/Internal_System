import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModViewComponent } from './customer-mod-view.component';

describe('CustomerModViewComponent', () => {
  let component: CustomerModViewComponent;
  let fixture: ComponentFixture<CustomerModViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerModViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerModViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
