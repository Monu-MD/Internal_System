import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedueTodayComponent } from './invoicedue-today.component';

describe('InvoicedueTodayComponent', () => {
  let component: InvoicedueTodayComponent;
  let fixture: ComponentFixture<InvoicedueTodayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicedueTodayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicedueTodayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
