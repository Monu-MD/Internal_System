import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommonCodeComponent } from './view-common-code.component';

describe('ViewCommonCodeComponent', () => {
  let component: ViewCommonCodeComponent;
  let fixture: ComponentFixture<ViewCommonCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCommonCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCommonCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
