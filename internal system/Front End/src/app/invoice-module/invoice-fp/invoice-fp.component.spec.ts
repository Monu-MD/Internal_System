import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceFPComponent } from './invoice-fp.component';

describe('InvoiceFPComponent', () => {
  let component: InvoiceFPComponent;
  let fixture: ComponentFixture<InvoiceFPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceFPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceFPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
