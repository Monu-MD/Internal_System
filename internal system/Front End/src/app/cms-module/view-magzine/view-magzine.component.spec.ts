import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMagzineComponent } from './view-magzine.component';

describe('ViewMagzineComponent', () => {
  let component: ViewMagzineComponent;
  let fixture: ComponentFixture<ViewMagzineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMagzineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewMagzineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
