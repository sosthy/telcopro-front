import {Portable} from './portable.model';

export class PortableItem {
  id: number;
  codeQrc: string;
  codeBar: string;
  serial: string;
  reference: string;
  portable: Portable;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.codeQrc = obj ? (obj.codeQrc ? obj.codeQrc : '') : '';
    this.codeBar = obj ? (obj.codeBar ? obj.codeBar : '') : '';
    this.serial = obj ? (obj.serial ? obj.serial : '') : '';
    this.reference = obj ? (obj.reference ? obj.reference : '') : '';
    this.portable = obj ? (obj.portable ? obj.portable : new Portable()) : new Portable();
  }
}
