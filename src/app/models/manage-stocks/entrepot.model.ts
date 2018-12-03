import {Emplacement} from './emplacement.model';
import {Mouvment} from './mouvment.model';
import {WorkSpace} from '../workSpace.model';

export class GenericEntrepot extends  WorkSpace {
  nbOfProduct: number;
  priceTotal: number;
  volume: number;
  volumeSecurity: number;

  constructor(obj?: any) {
    super(obj);
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.nbOfProduct = obj ? (obj.nbOfProduct ? obj.nbOfProduct : 0) : 0;
    this.priceTotal = obj ? (obj.priceTotal ? obj.priceTotal : 0) : 0;
    this.volume = obj ? (obj.volume ? obj.volume : 0) : 0;
    this.volumeSecurity = obj ? (obj.volumeSecurity ? obj.volumeSecurity : 0) : 0;
  }
}
