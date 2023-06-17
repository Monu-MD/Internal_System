import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimburseApproveComponent } from './reimburse-approve.component';

describe('ReimburseApproveComponent', () => {
  let component: ReimburseApproveComponent;
  let fixture: ComponentFixture<ReimburseApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimburseApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReimburseApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
