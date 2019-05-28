import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HeroService } from '../../Service/hero.service';
import {WeaponService} from "../../Service/weapon.service";
import { Hero } from '../../data/hero';
import {Weapon} from "../../data/weapon";
import {IMG_PATH} from "../../data/imgPath";

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css']
})
export class HeroNewComponent implements OnInit {

  hero: Hero;
  weapons: Weapon[];
  weapon: Weapon;
  image:string;

  constructor( private route: ActivatedRoute,
               private heroService: HeroService,
               private weaponService: WeaponService,
               private location: Location,
               private router: Router) {}

  ngOnInit() {
    this.hero = new Hero();
    this.hero.name = "Hero";
    this.hero.look = IMG_PATH[0];
    this.weapon = new Weapon();
    this.getWeapons();
  }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['heroes']);
  }

  //on vérifie que on a réussi à enregistrer le nouveau héro, si c'est le cas on redirige vers le dashboard
  saveHero() {
    if (this.heroService.addHero(this.hero, this.weapon)) {
      this.goBack();
    }
  }

  getMessageError():string {
    return this.heroService.getMessageError(this.hero, this.weapon);
  }

  onChange(): void{
    this.weaponService.getWeapon(this.hero.idWeapon).subscribe(
      weapon => { this.weapon = weapon; },
      error => console.error('Observer got an error: ' + error),
      () => console.log('Observer got a complete notification')
    );
  }

  getImg(prevOrNext):void {
    this.hero.look = this.heroService.getImg(prevOrNext, this.hero);
  }

}
