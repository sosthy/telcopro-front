import { WorkSpace } from './workSpace.model';

export class Employee {
  id: number;
  name: string;
  surname: string;
  phone: string;
  website: string;
  sex: string;
  cni: string;
  photo: string;
  birthday: Date;
  hiringDate: Date;
  seniority: number;
  workSpace: WorkSpace;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.surname = obj ? (obj.surname ? obj.surname : '') : '';
    this.phone = obj ? (obj.phone ? obj.phone : '') : '';
    this.website = obj ? (obj.website ? obj.website : '') : '';
    this.sex = obj ? (obj.sex ? obj.sex : '') : '';
    this.cni = obj ? (obj.cni ? obj.cni : '') : '';
    this.photo = obj ? (obj.id ? obj.id : '') : '';
    this.birthday = obj ? (obj.id ? obj.id : new Date()) : new Date();
    this.seniority = obj ? (obj.seniority ? obj.seniority : null) : null;
    this.workSpace = obj ? (obj.workSpace ? obj.workSpace : new WorkSpace()) : new WorkSpace();
  }

}
