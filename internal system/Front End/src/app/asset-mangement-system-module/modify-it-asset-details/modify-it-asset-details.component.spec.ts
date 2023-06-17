import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyItAssetDetailsComponent } from './modify-it-asset-details.component';

describe('ModifyItAssetDetailsComponent', () => {
  let component: ModifyItAssetDetailsComponent;
  let fixture: ComponentFixture<ModifyItAssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyItAssetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyItAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
