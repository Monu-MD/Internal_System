import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRejectedReqComponent } from './app-rejected-req.component';

describe('AppRejectedReqComponent', () => {
  let component: AppRejectedReqComponent;
  let fixture: ComponentFixture<AppRejectedReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRejectedReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppRejectedReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
