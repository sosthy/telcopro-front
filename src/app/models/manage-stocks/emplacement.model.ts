import {GenericEntrepot} from './entrepot.model';

export class Emplacement {
  id: number;
  name: string;
  nbOfProduct: number;
  priceTotalOfProduct: number;
  entrepot: GenericEntrepot;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.entrepot = obj ? (obj.entrepot ? obj.entrepot : new GenericEntrepot()) : new GenericEntrepot();
    this.nbOfProduct = obj ? (obj.nbOfProduct ? obj.nbOfProduct : 0) : 0;
    this.priceTotalOfProduct = obj ? (obj.priceTotalOfProduct ? obj.priceTotalOfProduct : 0) : 0;
  }
}
