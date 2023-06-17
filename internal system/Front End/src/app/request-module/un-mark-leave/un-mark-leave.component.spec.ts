import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnMarkLeaveComponent } from './un-mark-leave.component';

describe('UnMarkLeaveComponent', () => {
  let component: UnMarkLeaveComponent;
  let fixture: ComponentFixture<UnMarkLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnMarkLeaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnMarkLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
