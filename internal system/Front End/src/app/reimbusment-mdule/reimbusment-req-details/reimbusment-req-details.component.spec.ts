import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReimbusmentReqDetailsComponent } from './reimbusment-req-details.component';

describe('ReimbusmentReqDetailsComponent', () => {
  let component: ReimbusmentReqDetailsComponent;
  let fixture: ComponentFixture<ReimbusmentReqDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReimbusmentReqDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReimbusmentReqDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
