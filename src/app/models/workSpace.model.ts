
export class WorkSpace {
  id: number;
  name: string;
  localisation: string;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.localisation = obj ? (obj.localisation ? obj.localisation : '') : '';
  }
}
