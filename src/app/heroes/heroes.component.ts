import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { HEROES } from '../data/mock-heroes';
import { HeroService } from '../Service/hero.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  hero: Hero = {id:1, name:"RilletteMan"};
  heroes: Hero[];
  selectedHero : Hero;
  onSelect(hero: Hero) : void {
    this.selectedHero = hero;
  }

  constructor(private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit() {
    this.getHeroes();
  }

}
