import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprDoappraisalComponent } from './apr-doappraisal.component';

describe('AprDoappraisalComponent', () => {
  let component: AprDoappraisalComponent;
  let fixture: ComponentFixture<AprDoappraisalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AprDoappraisalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprDoappraisalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
