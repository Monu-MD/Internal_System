import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNonItAssetDetailsComponent } from './add-non-it-asset-details.component';

describe('AddNonItAssetDetailsComponent', () => {
  let component: AddNonItAssetDetailsComponent;
  let fixture: ComponentFixture<AddNonItAssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNonItAssetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNonItAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
