import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPersonalDetailsComponent } from './emp-personal-details.component';

describe('EmpPersonalDetailsComponent', () => {
  let component: EmpPersonalDetailsComponent;
  let fixture: ComponentFixture<EmpPersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpPersonalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
