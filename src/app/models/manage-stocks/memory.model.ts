

export class Memory {
  id: number;
  ram: number;
  rom: number;
  brand: string;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.ram = obj ? (obj.ram ? obj.ram : null) : null;
    this.rom = obj ? (obj.rom ? obj.rom : null) : null;
    this.brand = obj ? (obj.brand ? obj.brand : null) : null;
  }
}
