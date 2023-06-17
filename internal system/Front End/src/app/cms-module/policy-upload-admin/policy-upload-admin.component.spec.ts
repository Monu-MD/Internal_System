import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyUploadAdminComponent } from './policy-upload-admin.component';

describe('PolicyUploadAdminComponent', () => {
  let component: PolicyUploadAdminComponent;
  let fixture: ComponentFixture<PolicyUploadAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyUploadAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolicyUploadAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
