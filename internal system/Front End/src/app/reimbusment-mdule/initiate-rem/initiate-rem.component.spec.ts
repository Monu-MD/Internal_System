import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitiateRemComponent } from './initiate-rem.component';

describe('InitiateRemComponent', () => {
  let component: InitiateRemComponent;
  let fixture: ComponentFixture<InitiateRemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitiateRemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitiateRemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
