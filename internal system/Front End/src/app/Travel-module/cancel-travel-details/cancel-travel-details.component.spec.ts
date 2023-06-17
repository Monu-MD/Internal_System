import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTravelDetailsComponent } from './cancel-travel-details.component';

describe('CancelTravelDetailsComponent', () => {
  let component: CancelTravelDetailsComponent;
  let fixture: ComponentFixture<CancelTravelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelTravelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelTravelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
