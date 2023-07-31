import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejDocComponent } from './rej-doc.component';

describe('RejDocComponent', () => {
  let component: RejDocComponent;
  let fixture: ComponentFixture<RejDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejDocComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
