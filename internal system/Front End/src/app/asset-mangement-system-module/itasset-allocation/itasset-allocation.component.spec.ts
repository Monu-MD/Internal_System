import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ITAssetAllocationComponent } from './itasset-allocation.component';

describe('ITAssetAllocationComponent', () => {
  let component: ITAssetAllocationComponent;
  let fixture: ComponentFixture<ITAssetAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ITAssetAllocationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ITAssetAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
