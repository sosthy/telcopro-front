import {Mouvment} from './mouvment.model';
import {Product} from './product.model';
import {PortableItem} from "./portable-item.model";

export class MouvmentLine {
  id: number;
  quantity: number;
  priceUnit: number;
  priceTotal: number;
  mouvement: Mouvment;
  product: Product;
  note: string;
  productsItem: Array<PortableItem>;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.quantity = obj ? (obj.quantity ? obj.quantity : 0) : 0;
    this.priceUnit = obj ? (obj.priceUnit ? obj.priceUnit : 0) : 0;
    this.priceTotal = obj ? (obj.priceTotal ? obj.priceTotal : 0) : 0;
    this.mouvement = obj ? (obj.mouvement ? obj.mouvement : new Mouvment()) : new Mouvment();
    this.product = obj ? (obj.product ? obj.product : new Product()) : new Product();
    this.note = obj ? (obj.note ? obj.note : '') : '';
    this.productsItem = obj ? (obj.productsItem ? obj.productsItem : new Array()) :  new Array();
  }
}
