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
    this.codeQrc = obj ? (obj.codeQrc ? obj.codeQrc : null) : null;
    this.codeBar = obj ? (obj.codeBar ? obj.codeBar : null) : null;
    this.serial = obj ? (obj.serial ? obj.serial : null) :null;
    this.reference = obj ? (obj.reference ? obj.reference : null) : null;
    this.portable = obj ? (obj.portable ? obj.portable : null) : null;
  }
}
