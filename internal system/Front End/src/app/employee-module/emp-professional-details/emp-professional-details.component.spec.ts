import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpProfessionalDetailsComponent } from './emp-professional-details.component';

describe('EmpProfessionalDetailsComponent', () => {
  let component: EmpProfessionalDetailsComponent;
  let fixture: ComponentFixture<EmpProfessionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpProfessionalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpProfessionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
