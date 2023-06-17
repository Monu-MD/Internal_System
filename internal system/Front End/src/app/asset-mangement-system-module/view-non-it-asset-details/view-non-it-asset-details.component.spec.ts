import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNonItAssetDetailsComponent } from './view-non-it-asset-details.component';

describe('ViewNonItAssetDetailsComponent', () => {
  let component: ViewNonItAssetDetailsComponent;
  let fixture: ComponentFixture<ViewNonItAssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNonItAssetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNonItAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
