import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTravelApprQueueComponent } from './view-travel-appr-queue.component';

describe('ViewTravelApprQueueComponent', () => {
  let component: ViewTravelApprQueueComponent;
  let fixture: ComponentFixture<ViewTravelApprQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTravelApprQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTravelApprQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
