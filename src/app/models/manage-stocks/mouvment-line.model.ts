import {Mouvment} from './mouvment.model';
import {Product} from './product.model';

export class MouvmentLine {
  id: number;
  quantity: number;
  priceUnit: number;
  priceTotal: number;
  mouvement: Mouvment;
  product: Product;
  note: string;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.quantity = obj ? (obj.quantity ? obj.quantity : null) : null;
    this.priceUnit = obj ? (obj.priceUnit ? obj.priceUnit : null) : null;
    this.priceTotal = obj ? (obj.priceTotal ? obj.priceTotal : null) :null;
    this.mouvement = obj ? (obj.mouvement ? obj.mouvement : null) : null;
    this.product = obj ? (obj.product ? obj.product : null) : null;
    this.note = obj ? (obj.note ? obj.note : null) : null;
  }
}
