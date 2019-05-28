import { Component, OnInit } from '@angular/core';
import {HeroService} from "../../Service/hero.service";
import {Hero} from "../../data/hero";
import {Weapon} from "../../data/weapon";
import {WeaponService} from "../../Service/weapon.service";

@Component({
  selector: 'app-fight',
  templateUrl: './fight-select.component.html',
  styleUrls: ['./fight-select.component.css']
})
export class FightSelectComponent implements OnInit {

  heroes: Hero[];
  hero1: Hero;
  hero1Id:string;
  weapon1:Weapon;
  hero2: Hero;
  hero2Id:string;
  weapon2:Weapon;

  constructor(private heroService: HeroService,
              private weaponService: WeaponService) { }

  ngOnInit() {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);

  }

  onChange(number):void {
    switch (number) {
      case 1:
        this.heroService.getHero(this.hero1Id).subscribe(
          hero => {
            this.hero1 = hero;
            this.getWeapon(number);
          },
          error => console.error('Observer got an error: ' + error),
          () => console.log('Observer got a complete notification')
        );
      break;
      case 2:
        this.heroService.getHero(this.hero2Id).subscribe(
          hero => {
            this.hero2 = hero;
            this.getWeapon(2);
          },
          error => console.error('Observer got an error: ' + error),
          () => console.log('Observer got a complete notification')
        );
      break;
      }

  }

  getWeapon(number) {
    switch (number) {
      case 1:
        this.weaponService.getWeapon(this.hero1.idWeapon).subscribe(
          weapon => { this.weapon1 = weapon; },
          error => console.error('Observer got an error: ' + error),
          () => console.log('Observer got a complete notification')
        );
        break;
      case 2:
        this.weaponService.getWeapon(this.hero2.idWeapon).subscribe(
          weapon => { this.weapon2 = weapon; },
          error => console.error('Observer got an error: ' + error),
          () => console.log('Observer got a complete notification')
        );
        break;
    }
  }
}
