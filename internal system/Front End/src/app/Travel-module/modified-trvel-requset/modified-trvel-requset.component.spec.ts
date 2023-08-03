import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiedTrvelRequsetComponent } from './modified-trvel-requset.component';

describe('ModifiedTrvelRequsetComponent', () => {
  let component: ModifiedTrvelRequsetComponent;
  let fixture: ComponentFixture<ModifiedTrvelRequsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifiedTrvelRequsetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifiedTrvelRequsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
