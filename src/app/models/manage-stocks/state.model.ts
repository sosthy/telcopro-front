import {Product} from './product.model';

export class State {
   id: number;
  name: string;
  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
  }
}
