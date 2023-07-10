import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNonItAssetDetailComponent } from './view-non-it-asset-detail.component';

describe('ViewNonItAssetDetailComponent', () => {
  let component: ViewNonItAssetDetailComponent;
  let fixture: ComponentFixture<ViewNonItAssetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewNonItAssetDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNonItAssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
