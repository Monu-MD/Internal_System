import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyItAllocationDetailsComponent } from './modify-it-allocation-details.component';

describe('ModifyItAllocationDetailsComponent', () => {
  let component: ModifyItAllocationDetailsComponent;
  let fixture: ComponentFixture<ModifyItAllocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyItAllocationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyItAllocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
