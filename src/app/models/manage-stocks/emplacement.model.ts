import {GenericEntrepot} from './entrepot.model';

export class Emplacement {
  id: number;
  name: string;
  nbOfProduct: number;
  priceTotalOfProduct: number;
  entrepot: GenericEntrepot;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : null) : null;
    this.entrepot = obj ? (obj.entrepot ? obj.entrepot : null) : null;
    this.nbOfProduct = obj ? (obj.nbOfProduct ? obj.nbOfProduct : null) : null;
    this.priceTotalOfProduct = obj ? (obj.priceTotalOfProduct ? obj.priceTotalOfProduct : null) : null;
  }
}
