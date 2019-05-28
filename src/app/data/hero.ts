import {Serializable} from './serializable';
import {Weapon} from "./weapon";

export class Hero extends Serializable  {
  id: string;
  name: string;
  _attaque: number;
  _degats: number;
  _esquive: number;
  _PV: number;
  idWeapon: string;
  look: string;

  private static readonly _MAX:number =40;

  uneMethode(): string {
    return 'le nom de mon hero' + this.name;
  }

  getTotal() : number {
    var total =  this._attaque + this._esquive + this._degats + this._PV;
    if (total) {
      return total;
    }
    return 0;
  }

  isNotValid(weapon:Weapon): number {
    if(this.idWeapon == null) {
      return 6;
    } else if (this._attaque == null || this._attaque < 0 ||  this._attaque + weapon._attaque <= 0) {
      return 1;
    } else if(this._degats == null || this._degats < 0 ||  this._degats + weapon._degats <= 0) {
      return 2;
    } else if(this._esquive == null || this._esquive < 0 ||  this._esquive + weapon._esquive <= 0) {
      return 3;
    } else if(this._PV == null || this._PV <= 0 ||  this._PV + weapon._PV <= 0) {
      return 4;
    } else if(this.getTotal() > 40) {
      return 5;
    }
    return 0;
  }

  getAttr(attribut) {
    if (attribut.indexOf("PV") >= 0) {
      return this._PV;
    } else if (attribut.indexOf("esquive") >= 0) {
      return this._esquive;
    } else if (attribut.indexOf("degats") >= 0) {
      return this._degats;
    } else if (attribut.indexOf("attaque") >= 0) {
      return this._attaque;
    } else if (attribut.indexOf("total") >= 0) {
      return this.getTotal();
    }
    return null;
  }


}
