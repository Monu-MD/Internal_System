import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyProfessionalDetailsComponent } from './modify-professional-details.component';

describe('ModifyProfessionalDetailsComponent', () => {
  let component: ModifyProfessionalDetailsComponent;
  let fixture: ComponentFixture<ModifyProfessionalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyProfessionalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyProfessionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
