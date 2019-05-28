import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FightGameComponent } from './fight-game.component';

describe('FightGameComponent', () => {
  let component: FightGameComponent;
  let fixture: ComponentFixture<FightGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FightGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FightGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
