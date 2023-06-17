import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchEmployeeDetailsComponent } from './search-employee-details.component';

describe('SearchEmployeeDetailsComponent', () => {
  let component: SearchEmployeeDetailsComponent;
  let fixture: ComponentFixture<SearchEmployeeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchEmployeeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchEmployeeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
