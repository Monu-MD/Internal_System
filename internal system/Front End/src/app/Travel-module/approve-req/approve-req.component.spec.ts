import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveReqComponent } from './approve-req.component';

describe('ApproveReqComponent', () => {
  let component: ApproveReqComponent;
  let fixture: ComponentFixture<ApproveReqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveReqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveReqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
