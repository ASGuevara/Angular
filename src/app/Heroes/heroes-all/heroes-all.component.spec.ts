import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesAllComponent } from './heroes-all.component';

describe('HeroesComponent', () => {
  let component: HeroesAllComponent;
  let fixture: ComponentFixture<HeroesAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
