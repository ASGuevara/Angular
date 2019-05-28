import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HeroService} from "../../Service/hero.service";
import {WeaponService} from "../../Service/weapon.service";
import {Location} from "@angular/common";
import {Hero} from "../../data/hero";
import {Weapon} from "../../data/weapon";

@Component({
  selector: 'app-fight-game',
  templateUrl: './fight-game.component.html',
  styleUrls: ['./fight-game.component.css']
})
export class FightGameComponent implements OnInit {

  hero1:Hero;
  hero2:Hero;
  weapon1:Weapon;
  weapon2:Weapon;
  hero1action:string;
  hero2action:string;
  tourNumber:number;
  fin:boolean;
  deHero1:number;
  deHero2:number;
  esquive:number;
  attaque:number;
  degats:number;

  constructor(private route: ActivatedRoute,
              private heroService: HeroService,
              private weaponService: WeaponService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.getHeroes();
    this.reset();
    this.tourNumber = 0;
    this.fin = false;
  }

  getHeroes(): void {
    const id1 = this.route.snapshot.params['hero1'];
    this.heroService.getHero(id1).subscribe(
      hero => {this.hero1 = hero;
                    this.getWeapon(1);
      },
      error => console.error('Observer got an error: ' + error),
      () => console.log('Observer got a complete notification')
    );

    const id2 = this.route.snapshot.params['hero2'];
    this.heroService.getHero(id2).subscribe(
      hero => {this.hero2 = hero;
                    this.getWeapon(2);
      },
      error => console.error('Observer got an error: ' + error),
      () => console.log('Observer got a complete notification')
    );
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

  attaquer(number):void {
    this.reset();
    this.lancerDes();

    switch (number) {
      case 1:
        this.attaque = this.hero1._attaque + this.weapon1._attaque + Math.pow(2, this.deHero1);
        this.esquive = this.hero2._esquive + this.weapon2._esquive + Math.pow(2, this.deHero2);
        this.degats = this.heroService.getDegats(this.attaque, this.esquive, this.hero1, this.weapon1);
        if (this.degats) {
          this.hero1action = this.hero1.name + " réussi son attaque et inflige " + this.degats + " à l'adversaire.       ";
          this.hero2action = this.hero2.name + " perd " + this.degats + " points de vie";
          this.hero2._PV = this.hero2._PV - this.degats;
        } else {
          this.hero1action = this.hero1.name + " rate son attaque.";
        }
        if (this.hero2._PV + this.weapon2._PV <= 0) {
          this.hero1action += this.hero1.name + " a gagné le match !";
          this.hero2action = this.hero2.name + " a perdu le match";
          this.fin = true;
        }
        break;
      case 2:
        this.attaque = this.hero2._attaque + this.weapon2._attaque + Math.pow(2, this.deHero2);
        this.esquive = this.hero1._esquive + this.weapon1._esquive + Math.pow(2, this.deHero1);
        this.degats = this.heroService.getDegats(this.attaque, this.esquive, this.hero2, this.weapon2);
        if (this.degats) {
          this.hero2action = this.hero2.name + " réussi son attaque et inflige " + this.degats + " à l'adversaire.       ";
          this.hero1action = this.hero1.name + " perd " + this.degats + " points de vie";
          this.hero1._PV = this.hero1._PV - this.degats;
        } else {
          this.hero2action = this.hero2.name + " rate son attaque.";
        }
        if (this.hero1._PV + this.weapon1._PV <= 0) {
          this.hero2action += this.hero2.name + " a gagné le match !";
          this.hero1action = this.hero1.name + " a perdu le match";
          this.fin = true;
        }
        break;
    }
  }

  sesoigner(number):void {
    this.reset();
    this.lancerDes();

    switch (number) {
      case 1:
        this.hero1action = this.hero1.name+" se soigne de"+this.deHero1+".";
        this.hero1._PV += this.deHero1;
        this.deHero2 = null;
        break;
      case 2:
        this.hero2action = this.hero2.name+" se soigne de"+this.deHero2+".";
        this.hero2._PV += this.deHero1;
        this.deHero1 = null;
        break;
    }
  }

  reset():void {
    this.tourNumber++;
    this.attaque = null;
    this.esquive = null;
    this.deHero1 = null;
    this.deHero2 = null;
    this.hero1action = "";
    this.hero2action = "";
    this.degats = 0;
  }
  lancerDes():void {
    this.deHero1 =  Math.floor((Math.random() * 3) + 1);
    this.deHero2 =  Math.floor((Math.random() * 3) + 1);
  }

  dropweapon(number):void {
    this.reset();
    this.lancerDes();
    var weapon = new Weapon();
    weapon._esquive = 0;
    weapon._attaque = 0;
    weapon._degats = 0;
    weapon._PV = 0;
    weapon.name = "rien";
    if(number ==1) {
      this.weapon1 = weapon;
      this.hero1.idWeapon = null;
    } else if (number == 2) {
      this.weapon2 = weapon;
      this.hero2.idWeapon = null;
    }

  }
}
