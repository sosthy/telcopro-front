export class RecipientGroupe {
   id: number;
  name: string;
  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null ) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
import {Recipient} from './recipient.model';

export class RecipientGroupe {
  id: number;
  name: string;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.name = obj ? (obj.name ? obj.name : null) : null;
  }
}
