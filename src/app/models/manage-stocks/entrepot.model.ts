import {Emplacement} from './emplacement.model';
import {Mouvment} from './mouvment.model';
import {AppWorkspace} from "./workspace.model";

export class GenericEntrepot extends  AppWorkspace{
  nbOfProduct: number;
  priceTotal: number;
  volume: number;
  volumeSecurity: number;

  constructor(obj?: any) {
    super(obj);
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : null) : null;
    this.nbOfProduct = obj ? (obj.nbOfProduct ? obj.nbOfProduct : null) : null;
    this.priceTotal = obj ? (obj.priceTotal ? obj.priceTotal : null) : null;
    this.volume = obj ? (obj.volume ? obj.volume : null) : null;
    this.volumeSecurity = obj ? (obj.volumeSecurity ? obj.volumeSecurity : null) : null;
  }
}
