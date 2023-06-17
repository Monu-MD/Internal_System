import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateusdReportComponent } from './generateusd-report.component';

describe('GenerateusdReportComponent', () => {
  let component: GenerateusdReportComponent;
  let fixture: ComponentFixture<GenerateusdReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateusdReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateusdReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
