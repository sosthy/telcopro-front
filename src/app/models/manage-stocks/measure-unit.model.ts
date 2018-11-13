export class MeasureUnit {
  id: number;
  unity: string;
<<<<<<< HEAD

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.unity = obj ? (obj.unity ? obj.unity : '') : '';
=======
  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
   this.unity = obj ? (obj.unity ? obj.unity : '') : '';
>>>>>>> 820d882cb7b5bf950e5dfcc7d1e80171ff1f4757
  }
}
