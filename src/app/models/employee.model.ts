import { WorkSpace } from './workSpace.model';
import {Person} from "./person.model";

export class Employee extends Person {

  poste: string;
  hiringDate: Date;
  seniority: number;
  workSpace: WorkSpace;

  constructor(obj?: any) {
    super(obj);
    this.poste = obj ? (obj.poste ? obj.poste : '') : '';
    this.hiringDate = obj ? (obj.hiringDate ? obj.hiringDate : null) : null;
    this.seniority = obj ? (obj.seniority ? obj.seniority : 0) : 0;
    this.workSpace = obj ? (obj.workSpace ? obj.workSpace : new WorkSpace(null)) : new WorkSpace(null);
  }

}
