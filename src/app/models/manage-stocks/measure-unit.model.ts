export class MeasureUnit {
  id: number;
  unity: string;
  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
   this.unity = obj ? (obj.unity ? obj.unity : '') : '';
  }
}
