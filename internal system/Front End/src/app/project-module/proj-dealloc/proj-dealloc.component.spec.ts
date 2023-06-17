import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjDeallocComponent } from './proj-dealloc.component';

describe('ProjDeallocComponent', () => {
  let component: ProjDeallocComponent;
  let fixture: ComponentFixture<ProjDeallocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjDeallocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjDeallocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
