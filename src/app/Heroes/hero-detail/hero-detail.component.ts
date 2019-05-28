import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { HeroService } from '../../Service/hero.service';

import { Hero } from '../../data/hero';
import {Weapon} from "../../data/weapon";
import {WeaponService} from "../../Service/weapon.service";
import {IMG_PATH} from "../../data/imgPath";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;
  weapon: Weapon;
  weapons:Weapon[];

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private weaponService: WeaponService,
              private location: Location,
              private router: Router
  ) {}

  ngOnInit() {
    this.getHero();
    this.getWeapons();
  }

  getHero(): void {
    const id = this.route.snapshot.params['id'];

    //
    this.heroService.getHero(id).subscribe(
      hero => {this.hero = hero;
                    this.getWeapon();
                    },
      error => console.error('Observer got an error: ' + error),
      () => console.log('Observer got a complete notification')
    );

  }

  getWeapon() {
    this.weaponService.getWeapon(this.hero.idWeapon).subscribe(
      weapon => { this.weapon = weapon; },
      error => console.error('Observer got an error: ' + error),
      () => console.log('Observer got a complete notification')
    );
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['heroes']);
  }

  updateHero() {
    //on vérifie que on a réussi à updater le héro, si c'est le cas on redirige vers le dashboard
    if (this.heroService.updateHero(this.hero.id, this.hero, this.weapon)) {
      this.goBack();
    }
  }

  getMessageError():string {
    return this.heroService.getMessageError(this.hero, this.weapon);
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  onChange(): void{
    if (this.hero.idWeapon) {
      this.weaponService.getWeapon(this.hero.idWeapon).subscribe(
        weapon => { this.weapon = weapon; },
        error => console.error('Observer got an error: ' + error),
        () => console.log('Observer got a complete notification')
      );
    }
  }

  getImg(prevOrNext):void {
    this.hero.look = this.heroService.getImg(prevOrNext, this.hero);
  }
}
