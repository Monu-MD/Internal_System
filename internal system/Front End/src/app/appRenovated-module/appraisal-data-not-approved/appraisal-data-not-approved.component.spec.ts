import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalDataNotApprovedComponent } from './appraisal-data-not-approved.component';

describe('AppraisalDataNotApprovedComponent', () => {
  let component: AppraisalDataNotApprovedComponent;
  let fixture: ComponentFixture<AppraisalDataNotApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppraisalDataNotApprovedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppraisalDataNotApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
