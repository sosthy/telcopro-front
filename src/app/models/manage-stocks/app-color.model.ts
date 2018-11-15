import {Product} from './product.model';

export class AppColor {
  id: number;
  name: string;
  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : null) : null;
  }
}
