import {GenericEntrepot} from './entrepot.model';
import {MouvmentLine} from './mouvment-line.model';
import {MouvmentType} from './mouvment-type.model';
import {Employee} from '../employee.model';
import {Recipient} from './recipient.model';

export class Mouvment {
  id: number;
  reference: string;
  date: Date;
  quantity: number;
  priceTotal: number;
  entrepotSource: GenericEntrepot;
  entrepotRecipient: GenericEntrepot;
  mouvementType: MouvmentType;
  user: Employee;
  recipient: Recipient;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.reference = obj ? (obj.reference ? obj.reference : null) : null;
    this.date = obj ? (obj.date ? obj.date : new Date()) : new Date();
    this.quantity = obj ? (obj.quantity ? obj.quantity : null) : null;
    this.priceTotal = obj ? (obj.priceTotal ? obj.priceTotal : null) : null;
    this.entrepotSource = obj ? (obj.entrepotSource ? obj.entrepotSource : null) : null;
    this.entrepotRecipient = obj ? (obj.entrepotRecipient ? obj.entrepotRecipient : null) : null;
    this.mouvementType = obj ? (obj.mouvementType ? obj.mouvementType : null) : null;
    this.user = obj ? (obj.user ? obj.user : null) : null;
    this.recipient = obj ? (obj.recipient ? obj.recipient : null) : null;
  }
}
