import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceRegeneratechooseComponent } from './invoice-regeneratechoose.component';

describe('InvoiceRegeneratechooseComponent', () => {
  let component: InvoiceRegeneratechooseComponent;
  let fixture: ComponentFixture<InvoiceRegeneratechooseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceRegeneratechooseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceRegeneratechooseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
