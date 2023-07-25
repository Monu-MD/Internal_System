import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocAppRejComponent } from './doc-app-rej.component';

describe('DocAppRejComponent', () => {
  let component: DocAppRejComponent;
  let fixture: ComponentFixture<DocAppRejComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocAppRejComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocAppRejComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
