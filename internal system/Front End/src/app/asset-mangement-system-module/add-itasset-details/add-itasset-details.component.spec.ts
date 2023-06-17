import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddITAssetDetailsComponent } from './add-itasset-details.component';

describe('AddITAssetDetailsComponent', () => {
  let component: AddITAssetDetailsComponent;
  let fixture: ComponentFixture<AddITAssetDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddITAssetDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddITAssetDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
