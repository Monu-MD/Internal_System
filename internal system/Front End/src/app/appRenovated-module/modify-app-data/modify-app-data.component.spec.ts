import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyAppDataComponent } from './modify-app-data.component';

describe('ModifyAppDataComponent', () => {
  let component: ModifyAppDataComponent;
  let fixture: ComponentFixture<ModifyAppDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyAppDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyAppDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
