import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildProjectComponent } from './child-project.component';

describe('ChildProjectComponent', () => {
  let component: ChildProjectComponent;
  let fixture: ComponentFixture<ChildProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildProjectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
