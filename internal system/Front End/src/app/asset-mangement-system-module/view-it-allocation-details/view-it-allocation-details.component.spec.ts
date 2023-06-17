import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItAllocationDetailsComponent } from './view-it-allocation-details.component';

describe('ViewItAllocationDetailsComponent', () => {
  let component: ViewItAllocationDetailsComponent;
  let fixture: ComponentFixture<ViewItAllocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItAllocationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItAllocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
