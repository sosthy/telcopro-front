

export class AppWorkspace {
  id: number;
  name: string;
  location: string;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : null) : null;
    this.location = obj ? (obj.location ? obj.location : null) : null;
  }
}
