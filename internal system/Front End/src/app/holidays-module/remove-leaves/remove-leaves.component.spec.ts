import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveLeavesComponent } from './remove-leaves.component';

describe('RemoveLeavesComponent', () => {
  let component: RemoveLeavesComponent;
  let fixture: ComponentFixture<RemoveLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
