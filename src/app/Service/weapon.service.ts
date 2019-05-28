import { Injectable } from '@angular/core';
import { Weapon } from '../data/weapon';
import { Observable, of } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

import {map} from "rxjs/operators";
import {Hero} from "../data/hero";


@Injectable({
  providedIn: 'root'
})
export class WeaponService {

  private static url = 'weapon';

  constructor(private db: AngularFirestore) {}

  getWeapons(): Observable<Weapon[]> {
    return this.db.collection<Weapon>(WeaponService.url)
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            const data = a.payload.doc.data();

            const weapon = new Weapon().fromJSON(data);

            const id = a.payload.doc.id;
            weapon.id = id;

            return weapon;
            ;

          });
        })
      );
  }

  getWeapon(id: string): Observable<Weapon> {
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(a => {

          // Get document data
          const data = a.payload.data() as Weapon;
          const weapon = new Weapon().fromJSON(data);
          weapon.id = id;
          return weapon;
        })
      );
  }

  deleteWeapon(id:string): void {
    this.getWeaponDocument(id).delete();
  }

  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {

    // return document
    return this.db.doc<Weapon>(WeaponService.url + `/`+id);
  }

  //retoune un boolean false si l'arme n'est pas valide et ne l'enregistre pas
  addWeapon(weapon: Weapon): boolean {
    if (!weapon.isNotValid()) {
      this.db.collection<Weapon>(WeaponService.url).add(Object.assign({}, weapon));
      return true;
    }

    return false;
  }

  //retoune un boolean false si l'arme n'est pas valide et ne l'enregistre pas
  updateWeapon(id: string, weapon: Weapon): boolean {
    if (!weapon.isNotValid()) {
      this.getWeaponDocument(id).update(Object.assign({}, weapon));
      return true;
    }

    return false;
  }

  getMessageError(weapon):string {
    switch (weapon.isNotValid()) {
      case 1:
        return "Veuillez entrer une attaque correcte";
        break;
      case 2:
        return "Veuillez entrer un dégât correcte";
        break;
      case 3:
        return "Veuillez entrer une esquive correcte";
        break;
      case 4:
        return "Veuillez entrer des point de vie correctes";
        break;
      case 5:
        return "Le total doit être égal à 0";
        break;
      default:
        return "";
        break;
    }
  }
}
