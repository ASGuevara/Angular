import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightSelectComponent } from './fight-select.component';

describe('FightSelectComponent', () => {
  let component: FightSelectComponent;
  let fixture: ComponentFixture<FightSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
