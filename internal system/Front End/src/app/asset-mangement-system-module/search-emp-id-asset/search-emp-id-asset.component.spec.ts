import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmpIdAssetComponent } from './search-emp-id-asset.component';

describe('SearchEmpIdAssetComponent', () => {
  let component: SearchEmpIdAssetComponent;
  let fixture: ComponentFixture<SearchEmpIdAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEmpIdAssetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEmpIdAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
