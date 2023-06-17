import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportBulkChooseComponent } from './report-bulk-choose.component';

describe('ReportBulkChooseComponent', () => {
  let component: ReportBulkChooseComponent;
  let fixture: ComponentFixture<ReportBulkChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportBulkChooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportBulkChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
