import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseinvoiceDetailsComponent } from './chooseinvoice-details.component';

describe('ChooseinvoiceDetailsComponent', () => {
  let component: ChooseinvoiceDetailsComponent;
  let fixture: ComponentFixture<ChooseinvoiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChooseinvoiceDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChooseinvoiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
