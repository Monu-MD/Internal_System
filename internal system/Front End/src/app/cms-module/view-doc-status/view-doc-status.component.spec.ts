import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDocStatusComponent } from './view-doc-status.component';

describe('ViewDocStatusComponent', () => {
  let component: ViewDocStatusComponent;
  let fixture: ComponentFixture<ViewDocStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDocStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDocStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
