
export class WorkSpace {
  id: number;
  name: string;
  location: string;
  email: string;
  phone: string;
  website: string;
  workSpaceType: string;
  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.location = obj ? (obj.location ? obj.location : '') : '';
    this.email = obj ? (obj.email ? obj.email : '') : '';
    this.phone = obj ? (obj.phone ? obj.phone : '') : '';
    this.website = obj ? (obj.website ? obj.website : '') : '';
    this.workSpaceType = obj ? (obj.workSpaceType ? obj.workSpaceType : '') : '';
  }
}
