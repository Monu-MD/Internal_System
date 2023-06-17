import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPersonalDetailsComponent } from './modify-personal-details.component';

describe('ModifyPersonalDetailsComponent', () => {
  let component: ModifyPersonalDetailsComponent;
  let fixture: ComponentFixture<ModifyPersonalDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPersonalDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
