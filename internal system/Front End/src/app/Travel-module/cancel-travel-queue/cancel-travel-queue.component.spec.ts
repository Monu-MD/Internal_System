import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelTravelQueueComponent } from './cancel-travel-queue.component';

describe('CancelTravelQueueComponent', () => {
  let component: CancelTravelQueueComponent;
  let fixture: ComponentFixture<CancelTravelQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelTravelQueueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelTravelQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
