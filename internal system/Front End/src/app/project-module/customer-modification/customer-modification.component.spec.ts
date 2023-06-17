import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModificationComponent } from './customer-modification.component';

describe('CustomerModificationComponent', () => {
  let component: CustomerModificationComponent;
  let fixture: ComponentFixture<CustomerModificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerModificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
