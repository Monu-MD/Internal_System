import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateinrReportComponent } from './generateinr-report.component';

describe('GenerateinrReportComponent', () => {
  let component: GenerateinrReportComponent;
  let fixture: ComponentFixture<GenerateinrReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GenerateinrReportComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GenerateinrReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
});
