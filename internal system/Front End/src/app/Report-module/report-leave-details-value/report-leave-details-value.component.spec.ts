import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLeaveDetailsValueComponent } from './report-leave-details-value.component';

describe('ReportLeaveDetailsValueComponent', () => {
  let component: ReportLeaveDetailsValueComponent;
  let fixture: ComponentFixture<ReportLeaveDetailsValueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportLeaveDetailsValueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportLeaveDetailsValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
