import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreDocument } from '@angular/fire/firestore';

import { Hero } from '../data/hero';
import {map} from 'rxjs/operators';
import {Weapon} from "../data/weapon";
import {WeaponService} from "./weapon.service";
import {IMG_PATH} from "../data/imgPath";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private static url = 'heroes';

  constructor(private weaponService: WeaponService,
              private db: AngularFirestore) {
  }

  getHeroes(): Observable<Hero[]> {

    return this.db.collection<Hero>(HeroService.url)
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            // Get document data
            const data = a.payload.doc.data();

            // New Hero
            const hero = new Hero().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            hero.id = id;

            // Use spread operator to add the id to the document data
            return hero;
            ;

          });
        })
      );
  }

  getHeroesTop3(): Observable<Hero[]> {

    //
    return this.db.collection(HeroService.url, ref => ref.limit(3))
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            // Get document data
            const data = a.payload.doc.data();

            // New Hero
            const hero = new Hero().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            hero.id = id;

            // Use spread operator to add the id to the document data
            return hero;

          });
        })
      );
  }

  private getHeroDocument(id: string): AngularFirestoreDocument<Hero> {

    // return document
    return this.db.doc<Hero>(HeroService.url + `/`+id);
  }

  getHero(id: string): Observable<Hero> {

    // Return hero observable
    return this.getHeroDocument(id).snapshotChanges()
      .pipe(
        map(a => {

          // Get document data
          const data = a.payload.data() as Hero;
          // return {id, ...data};

          // New Hero
          const hero = new Hero().fromJSON(data);
          hero.id = id;

          // Use spread operator to add the id to the document data
          return hero;
        })
      );
  }

  deleteHero(id:string): void {
    this.getHeroDocument(id).delete();
  }

  //retoune un boolean false si le héro n'est pas valide et ne l'enregistre pas
  addHero(hero: Hero, weapon:Weapon): boolean {
    if (!hero.isNotValid(weapon)) {
      this.db.collection<Hero>(HeroService.url).add(Object.assign({}, hero));
      return true;
    }

    return false;
  }

  //retoune un boolean false si le héro n'est pas valide et ne l'enregistre pas
  updateHero(id: string, hero: Hero, weapon:Weapon): boolean {
    if (!hero.isNotValid(weapon)) {
      // Update document
      this.getHeroDocument(id).update(Object.assign({}, hero));
      return true;
    }

    return false;
  }


  // retourne un message d'erreur si l'utilisateur entre une erreur dans l'entrée des stats du hero
  getMessageError(hero, weapon):string {
    switch (hero.isNotValid(weapon)) {
      case 1:
        return "Veuillez entrer une attaque > 1";
        break;
      case 2:
        return "Veuillez entrer un dégât > 1";
        break;
      case 3:
        return "Veuillez entrer une esquive > 1";
        break;
      case 4:
        return "Veuillez entrer des point de vie > 1";
        break;
      case 5:
        return "Vous avez dépassé les 40 points autorisés";
        break;
      case 6:
        return "Votre héro a besoin d'une arme.";
        break;
      default:
        return "";
        break;
    }
  }

  getFilterHeroes(value, heroes):Hero[] {
    return heroes.filter(heroes.name.contains(value));
  }

  getImg(prevOrNext, hero):string {
    var indexLook = IMG_PATH.indexOf(hero.look);
    switch (prevOrNext) {
      case 'next':
        indexLook = indexLook-1;
        if(indexLook < 0) {
          indexLook = IMG_PATH.length-1;
        }
        break;
      case 'prev':
        indexLook = indexLook+1;
        if(indexLook >= IMG_PATH.length) {
          indexLook = 0;
        }
        break;
    }

    return IMG_PATH[indexLook];
  }

  getDegats(attaque, esquive, hero1,weapon1):number {
    if (attaque > esquive) {

      return Math.round((hero1._degats+weapon1._degats)*(1-(esquive/attaque)));
    }

    return 0;
  }
}

