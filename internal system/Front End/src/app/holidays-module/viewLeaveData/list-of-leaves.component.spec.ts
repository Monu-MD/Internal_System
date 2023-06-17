import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfLeavesComponent } from './list-of-leaves.component';

describe('ListOfLeavesComponent', () => {
  let component: ListOfLeavesComponent;
  let fixture: ComponentFixture<ListOfLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
