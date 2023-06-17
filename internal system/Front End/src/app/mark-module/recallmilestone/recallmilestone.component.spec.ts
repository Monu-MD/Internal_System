import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecallmilestoneComponent } from './recallmilestone.component';

describe('RecallmilestoneComponent', () => {
  let component: RecallmilestoneComponent;
  let fixture: ComponentFixture<RecallmilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecallmilestoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecallmilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
