import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimUserDetailsComponent } from './reim-user-details.component';

describe('ReimUserDetailsComponent', () => {
  let component: ReimUserDetailsComponent;
  let fixture: ComponentFixture<ReimUserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimUserDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReimUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
