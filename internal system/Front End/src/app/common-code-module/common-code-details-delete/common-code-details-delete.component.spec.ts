import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonCodeDetailsDeleteComponent } from './common-code-details-delete.component';

describe('CommonCodeDetailsDeleteComponent', () => {
  let component: CommonCodeDetailsDeleteComponent;
  let fixture: ComponentFixture<CommonCodeDetailsDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommonCodeDetailsDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonCodeDetailsDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
