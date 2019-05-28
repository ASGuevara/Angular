import { Component, OnInit } from '@angular/core';
import { Weapon } from '../../data/weapon';
import { WeaponService } from '../../Service/weapon.service';
import {Hero} from "../../data/hero";

@Component({
  selector: 'app-weapon',
  templateUrl: './weapon-all.component.html',
  styleUrls: ['./weapon-all.component.css']
})
export class WeaponAllComponent implements OnInit {

  weapons: Weapon[];
  weaponsFiltred:Weapon[];
  value:String;

  constructor(private weaponService: WeaponService) { }

  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weaponsFiltred = weapons);

    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  ngOnInit() {
    this.getWeapons();
  }

  searchByName(): void{
    //d'abbord, on réinitialise la liste des heros avec les valeurs de la bdd
    this.weaponsFiltred = this.weapons;
    //puis on filtre la liste affichée par la value entrée si elle a au moins un caractere
    if (this.value.length > 0) {
      this.weaponsFiltred = this.weaponsFiltred.filter(el =>  el.name.toUpperCase().indexOf(this.value.toUpperCase()) > -1);
    }
  }

  sortBy(attribut): void{
    // on trie la liste par l'attribut voulu
    this.weaponsFiltred = this.weaponsFiltred.sort(function (a, b) {return b.getAttr(attribut) - a.getAttr(attribut) ;});
  }

  delete(idWeapon): void {
    // on trie la liste par l'attribut voulu
    this.weaponService.deleteWeapon(idWeapon);
  }


}
