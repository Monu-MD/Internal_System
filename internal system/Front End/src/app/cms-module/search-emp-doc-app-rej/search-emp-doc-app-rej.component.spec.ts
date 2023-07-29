import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmpDocAppRejComponent } from './search-emp-doc-app-rej.component';

describe('SearchEmpDocAppRejComponent', () => {
  let component: SearchEmpDocAppRejComponent;
  let fixture: ComponentFixture<SearchEmpDocAppRejComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEmpDocAppRejComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEmpDocAppRejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
