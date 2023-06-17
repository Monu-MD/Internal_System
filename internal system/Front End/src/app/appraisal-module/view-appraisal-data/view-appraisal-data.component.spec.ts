import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAppraisalDataComponent } from './view-appraisal-data.component';

describe('ViewAppraisalDataComponent', () => {
  let component: ViewAppraisalDataComponent;
  let fixture: ComponentFixture<ViewAppraisalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAppraisalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAppraisalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
