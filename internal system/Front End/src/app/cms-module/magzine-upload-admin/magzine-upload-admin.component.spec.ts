import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MagzineUploadAdminComponent } from './magzine-upload-admin.component';

describe('MagzineUploadAdminComponent', () => {
  let component: MagzineUploadAdminComponent;
  let fixture: ComponentFixture<MagzineUploadAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MagzineUploadAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MagzineUploadAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
