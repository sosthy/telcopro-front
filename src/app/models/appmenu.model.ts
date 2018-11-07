
export class AppMenu {
  id: number;
  name: string;
  icon: string;
  description: string;
  color: string;
  link: string;

  constructor(obj?: any) {
    this.id = obj ? obj.id : null;
    this.name = obj ? obj.name : '';
    this.icon = obj ? obj.icon : '';
    this.description = obj ? obj.description : '';
    this.color = obj ? obj.color : '';
    this.link = obj ? obj.link : '';
  }

  public toString = (): string => {
    return this.name.toUpperCase();
  }
}
