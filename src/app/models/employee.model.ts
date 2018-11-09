import { Workspace } from './workspace.model';

export class Employee {
  id: number;
  name: string;
  surname: string;
  phone: string;
  website: string;
  sex: string;
  photo: File;
  birthday: Date;
  hiringDate: Date;
  anciennete: number;
  workspace: Workspace;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.surname = obj ? (obj.surname ? obj.surname : '') : '';
    this.phone = obj ? (obj.phone ? obj.phone : '') : '';
    this.website = obj ? (obj.website ? obj.website : '') : '';
    this.sex = obj ? (obj.sex ? obj.sex : '') : '';
    this.photo = obj ? (obj.id ? obj.id : '') : '';
    this.birthday = obj ? (obj.id ? obj.id : new Date()) : new Date();
    this.anciennete = obj ? (obj.anciennete ? obj.anciennete : null) : null;
    this.workspace = obj ? (obj.workspace ? obj.workspace : new Workspace()) : new Workspace();
  }

}
