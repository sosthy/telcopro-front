import {Mouvment} from './mouvment.model';

export class MouvmentType {
  id: number;
  name: string;
  note: string;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.name = obj ? (obj.name ? obj.name : null) : null;
    this.note = obj ? (obj.note ? obj.note : null) : null;
  }
}
