import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItAssetDetailComponent } from './view-it-asset-detail.component';

describe('ViewItAssetDetailComponent', () => {
  let component: ViewItAssetDetailComponent;
  let fixture: ComponentFixture<ViewItAssetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewItAssetDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewItAssetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
