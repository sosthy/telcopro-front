import { WorkSpace } from './workSpace.model';
import {Person} from "./person.model";

export class Employee extends Person {

  poste: string;
  hiringDate: Date;
  seniority: number;
  workSpace: WorkSpace;

  constructor(obj?: any) {
    super(obj);
    this.poste = obj ? (obj.poste ? obj.poste : null) : null;
    this.hiringDate = obj ? (obj.hiringDate ? obj.hiringDate : null) : null;
    this.seniority = obj ? (obj.seniority ? obj.seniority : null) : null;
    this.workSpace = obj ? (obj.workSpace ? obj.workSpace : null) : null;
  }

}
