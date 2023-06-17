import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyLeavesComponent } from './modify-leaves.component';

describe('ModifyLeavesComponent', () => {
  let component: ModifyLeavesComponent;
  let fixture: ComponentFixture<ModifyLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
