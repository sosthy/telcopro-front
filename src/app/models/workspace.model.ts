
export class WorkSpace {
  id: number;
  name: string;
  localisation: string;
  workSpaceType: string;
  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.localisation = obj ? (obj.localisation ? obj.localisation : '') : '';
    this.workSpaceType = obj ? (obj.workSpaceType ? obj.workSpaceType : '') : '';
  }
}
