import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAssetIdComponent } from './search-asset-id.component';

describe('SearchAssetIdComponent', () => {
  let component: SearchAssetIdComponent;
  let fixture: ComponentFixture<SearchAssetIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAssetIdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAssetIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
