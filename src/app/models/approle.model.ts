
import {AppMenu} from './appmenu.model';

export class AppRole {
  id: number;
  roleName: string;
  description: string;
  menus: Array<AppMenu>;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.roleName = obj ? (obj.roleName ? obj.roleName : '') : '';
    this.description = obj ? (obj.description ? obj.description : '') : '';
    this.menus = obj ? (obj.menus ? obj.menus : []) : [];
  }

  public toString = (): string => {
    return `${this.roleName.toUpperCase()}`;
  }
}
