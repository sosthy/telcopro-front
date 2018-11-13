export class State {
   id: number;
  name: string;
<<<<<<< HEAD

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
=======
  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
   this.name = obj ? (obj.name ? obj.name : '') : '';
>>>>>>> 820d882cb7b5bf950e5dfcc7d1e80171ff1f4757
  }
}
