import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItAssetDetailsComponent } from './view-it-asset-details.component';

describe('ViewItAssetDetailsComponent', () => {
  let component: ViewItAssetDetailsComponent;
  let fixture: ComponentFixture<ViewItAssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItAssetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
