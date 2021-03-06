import {GenericEntrepot} from './entrepot.model';
import {MouvmentLine} from './mouvment-line.model';
import {MouvmentType} from './mouvment-type.model';
import {Employee} from '../employee.model';
import {Recipient} from './recipient.model';

export class Mouvment {
  reference: string;
  date: Date;
  quantity: number;
  priceTotal: number;
  entrepotReceiver: GenericEntrepot;
  mouvmentType: MouvmentType;
  mouvmentLines: Array<MouvmentLine>;
  user: Employee;
  receiver: Employee;
  recipient: Recipient;

  constructor(obj?: any) {
    this.reference = obj ? (obj.reference ? obj.reference : null) : null;
    this.date = obj ? (obj.date ? obj.date : new Date()) : new Date();
    this.quantity = obj ? (obj.quantity ? obj.quantity : 0) : 0;
    this.priceTotal = obj ? (obj.priceTotal ? obj.priceTotal : 0) : 0;
    this.entrepotReceiver = obj ? (obj.entrepotReceiver ? obj.entrepotReceiver : null) : null;
    this.mouvmentType = obj ? (obj.mouvmentType ? obj.mouvmentType : null) : null;
    this.user = obj ? (obj.user ? obj.user : null) : null;
    this.receiver = obj ? (obj.receiver ? obj.receiver : null) : null;
    this.recipient = obj ? (obj.recipient ? obj.recipient : null) : null;
    this.mouvmentLines = obj ? (obj.mouvmentLines ? obj.mouvmentLines : new Array()) : new Array();
  }
}
