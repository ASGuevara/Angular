import {Component, Input, OnInit} from '@angular/core';
import { Weapon } from '../../data/weapon';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

import { WeaponService }  from '../../Service/weapon.service';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {

  weapon: Weapon;

  constructor(private route: ActivatedRoute,
              private weaponService: WeaponService,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.getWeapon();
  }

  getMessageError():string {
    return this.weaponService.getMessageError(this.weapon);
  }

  goBack(): void {
    // this.location.back();
    this.router.navigate(['weapon']);
  }

  updateWeapon() {
    if(this.weaponService.updateWeapon(this.weapon.id, this.weapon)) {
      this.goBack();
    }
  }

  getWeapon(): void {
    const id = this.route.snapshot.params['id'];

    this.weaponService.getWeapon(id)
      .subscribe(weapon => this.weapon = weapon);
  }


}
