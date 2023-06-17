import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsUploadAdminComponent } from './cms-upload-admin.component';

describe('CmsUploadAdminComponent', () => {
  let component: CmsUploadAdminComponent;
  let fixture: ComponentFixture<CmsUploadAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsUploadAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CmsUploadAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
