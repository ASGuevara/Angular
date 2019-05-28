import {Serializable} from './serializable';

export class Weapon extends Serializable {
  id:string;
  name:string;
  _attaque: number;
  _degats: number;
  _esquive: number;
  _PV: number;

  getTotal() : number {
    var total = this._attaque + this._esquive + this._degats + this._PV;
    if (!total) {
      total = 0;
    }
    return total;
  }

  isNotValid(): number {
    if(this._attaque == null || this._attaque < -5 || this._attaque > 5) {
      return 1;
    } else if(this._degats == null || this._degats < -5 || this._degats > 5) {
      return 2;
    } else if(this._esquive == null || this._esquive < -5 || this._esquive > 5) {
      return 3;
    } else if(this._PV == null || this._PV < -5 || this._PV > 5) {
      return 4;
    } else if(this.getTotal() != 0) {
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
    }
    return null;
  }

}
