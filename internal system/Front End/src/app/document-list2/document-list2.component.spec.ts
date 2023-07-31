import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentList2Component } from './document-list2.component';

describe('DocumentList2Component', () => {
  let component: DocumentList2Component;
  let fixture: ComponentFixture<DocumentList2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocumentList2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentList2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
