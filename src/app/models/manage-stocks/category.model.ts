export class GenericCategory {
  id: number;
  name: string;
  notes: string;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.notes = obj ? (obj.notes ? obj.notes : '') : '';
  }
}
