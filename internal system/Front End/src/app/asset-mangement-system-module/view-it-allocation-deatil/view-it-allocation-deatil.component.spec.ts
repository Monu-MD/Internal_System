import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItAllocationDeatilComponent } from './view-it-allocation-deatil.component';

describe('ViewItAllocationDeatilComponent', () => {
  let component: ViewItAllocationDeatilComponent;
  let fixture: ComponentFixture<ViewItAllocationDeatilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItAllocationDeatilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItAllocationDeatilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
