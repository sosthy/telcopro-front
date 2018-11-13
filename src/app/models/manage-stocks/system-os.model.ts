export class Systemos {
  id: number;
  name: string;
  version: string;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.version = obj ? (obj.version ? obj.version : '') : '';
  }
}
