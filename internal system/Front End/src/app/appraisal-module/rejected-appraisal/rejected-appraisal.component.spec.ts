import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedAppraisalComponent } from './rejected-appraisal.component';

describe('RejectedAppraisalComponent', () => {
  let component: RejectedAppraisalComponent;
  let fixture: ComponentFixture<RejectedAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedAppraisalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectedAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
