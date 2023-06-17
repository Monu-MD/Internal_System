import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyNonItAssetDetailsComponent } from './modify-non-it-asset-details.component';

describe('ModifyNonItAssetDetailsComponent', () => {
  let component: ModifyNonItAssetDetailsComponent;
  let fixture: ComponentFixture<ModifyNonItAssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyNonItAssetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyNonItAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
