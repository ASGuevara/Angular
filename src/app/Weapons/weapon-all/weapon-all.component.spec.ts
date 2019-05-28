import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponAllComponent } from './weapon-all.component';

describe('WeaponComponent', () => {
  let component: WeaponAllComponent;
  let fixture: ComponentFixture<WeaponAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeaponAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
