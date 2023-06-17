import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRaiseComponent } from './invoice-raise.component';

describe('InvoiceRaiseComponent', () => {
  let component: InvoiceRaiseComponent;
  let fixture: ComponentFixture<InvoiceRaiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceRaiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceRaiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
