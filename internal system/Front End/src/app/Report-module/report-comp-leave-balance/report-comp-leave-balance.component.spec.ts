import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCompLeaveBalanceComponent } from './report-comp-leave-balance.component';

describe('ReportCompLeaveBalanceComponent', () => {
  let component: ReportCompLeaveBalanceComponent;
  let fixture: ComponentFixture<ReportCompLeaveBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCompLeaveBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCompLeaveBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
