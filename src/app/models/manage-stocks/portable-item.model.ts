import {Portable} from './portable.model';
import {MouvmentLine} from './mouvment-line.model';

export class PortableItem {
  id: number;
  codeQrc: string;
  codeBar: string;
  serial: string;
  reference: string;
  portable: Portable;
  mouvmentLine: MouvmentLine;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.codeQrc = obj ? (obj.codeQrc ? obj.codeQrc : '') : '';
    this.codeBar = obj ? (obj.codeBar ? obj.codeBar : '') : '';
    this.serial = obj ? (obj.serial ? obj.serial : '') : '';
    this.reference = obj ? (obj.reference ? obj.reference : '') : '';
    this.portable = obj ? (obj.portable ? obj.portable : new Portable()) : new Portable();
    this.mouvmentLine = obj ? (obj.mouvmentLine ? obj.mouvmentLine : new MouvmentLine()) : new MouvmentLine();
  }
}
