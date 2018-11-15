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
  mouvementLines: MouvmentLine;
  mouvementType: MouvmentType;
  user: Employee;
  recipient: Recipient;
}
