import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCodeDetailsComponent } from './common-code-details.component';

describe('CommonCodeDetailsComponent', () => {
  let component: CommonCodeDetailsComponent;
  let fixture: ComponentFixture<CommonCodeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCodeDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCodeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
