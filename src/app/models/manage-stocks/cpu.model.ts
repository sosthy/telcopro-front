export class Cpu {
  id: number;
  brand: string;
  frequency: number;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.brand = obj ? (obj.brand ? obj.brand : null) : null;
    this.frequency = obj ? (obj.frequency ? obj.frequency : null) : null;
  }
}
