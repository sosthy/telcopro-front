import {GenericEntrepot} from './entrepot.model';
import {MouvmentLine} from './mouvment-line.model';
import {MouvmentType} from './mouvment-type.model';
import {Employee} from '../employee.model';
import {Recipient} from './recipient.model';
import {WorkSpace} from '../workSpace.model';

export class Mouvment {
  reference: string;
  date: Date;
  quantity: number;
  priceTotal: number;
  entrepotSource: WorkSpace;
  entrepotRecipient: WorkSpace;
  mouvmentType: MouvmentType;
  mouvmentLines: Array<MouvmentLine>;
  user: Employee;
  recipient: Recipient;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.reference = obj ? (obj.reference ? obj.reference : '') : '';
    this.date = obj ? (obj.date ? obj.date : new Date()) : new Date();
    this.quantity = obj ? (obj.quantity ? obj.quantity : 0) : 0;
    this.priceTotal = obj ? (obj.priceTotal ? obj.priceTotal : 0) : 0;
    this.entrepotSource = obj ? (obj.entrepotSource ? obj.entrepotSource : new WorkSpace()) : new WorkSpace();
    this.entrepotRecipient = obj ? (obj.entrepotRecipient ? obj.entrepotRecipient : new WorkSpace()) : new WorkSpace();
    this.mouvmentType = obj ? (obj.mouvmentType ? obj.mouvmentType : new MouvmentType()) : new MouvmentType();
    this.user = obj ? (obj.user ? obj.user : new Employee()) : new Employee();
    this.recipient = obj ? (obj.recipient ? obj.recipient : new Recipient()) : new Recipient();
    this.mouvmentLines = obj ? (obj.mouvmentLines ? obj.mouvmentLines : new Array()) : new Array();
  }
}
