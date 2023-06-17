import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoAppraisalComponent } from './do-appraisal.component';

describe('DoAppraisalComponent', () => {
  let component: DoAppraisalComponent;
  let fixture: ComponentFixture<DoAppraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoAppraisalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoAppraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
