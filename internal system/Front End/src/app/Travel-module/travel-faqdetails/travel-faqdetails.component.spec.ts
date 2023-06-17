import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelFAQDetailsComponent } from './travel-faqdetails.component';

describe('TravelFAQDetailsComponent', () => {
  let component: TravelFAQDetailsComponent;
  let fixture: ComponentFixture<TravelFAQDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelFAQDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelFAQDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
