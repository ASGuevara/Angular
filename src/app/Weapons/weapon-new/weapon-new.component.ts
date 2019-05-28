import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {WeaponService} from "../../Service/weapon.service";
import {Weapon} from "../../data/weapon";

@Component({
  selector: 'app-weapon-new',
  templateUrl: './weapon-new.component.html',
  styleUrls: ['./weapon-new.component.css']
})
export class WeaponNewComponent implements OnInit {

  weapon: Weapon;

  constructor(private route: ActivatedRoute,
              private weaponService: WeaponService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.weapon = new Weapon();
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['weapon']);
  }

  //on vérifie que on a réussi à enregistrer le nouveau héro, si c'est le cas on redirige vers le dashboard
  saveWeapon() {
    if (this.weaponService.addWeapon(this.weapon)) {
      this.goBack();
    }
  }

  getMessageError():string {
    return this.weaponService.getMessageError(this.weapon);
  }
}
