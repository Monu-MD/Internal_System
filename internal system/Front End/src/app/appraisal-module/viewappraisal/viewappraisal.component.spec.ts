import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewappraisalComponent } from './viewappraisal.component';

describe('ViewappraisalComponent', () => {
  let component: ViewappraisalComponent;
  let fixture: ComponentFixture<ViewappraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewappraisalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewappraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
