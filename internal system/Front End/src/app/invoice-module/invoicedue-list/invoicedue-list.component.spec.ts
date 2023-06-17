import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicedueListComponent } from './invoicedue-list.component';

describe('InvoicedueListComponent', () => {
  let component: InvoicedueListComponent;
  let fixture: ComponentFixture<InvoicedueListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicedueListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicedueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
