import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureLeavesComponent } from './configure-leaves.component';

describe('ConfigureLeavesComponent', () => {
  let component: ConfigureLeavesComponent;
  let fixture: ComponentFixture<ConfigureLeavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigureLeavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureLeavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
