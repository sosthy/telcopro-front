import {GenericEntrepot} from './entrepot.model';

export class Emplacement {
  id: number;
  name: string;
  entrepot: GenericEntrepot;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.entrepot = obj ? (obj.entrepot ? obj.entrepot : new GenericEntrepot()) : new GenericEntrepot();
  }
}
