import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCodeDetailsModifyComponent } from './common-code-details-modify.component';

describe('CommonCodeDetailsModifyComponent', () => {
  let component: CommonCodeDetailsModifyComponent;
  let fixture: ComponentFixture<CommonCodeDetailsModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCodeDetailsModifyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCodeDetailsModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
