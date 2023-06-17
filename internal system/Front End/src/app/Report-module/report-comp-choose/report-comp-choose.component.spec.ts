import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCompChooseComponent } from './report-comp-choose.component';

describe('ReportCompChooseComponent', () => {
  let component: ReportCompChooseComponent;
  let fixture: ComponentFixture<ReportCompChooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCompChooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportCompChooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
