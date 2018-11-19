

export class Person {
  id: number;
  name: string;
  surname: string;
  phone: string;
  website: string;
  sex: string;
  cni: string;
  photo: string;
  birthday: Date;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : null) : null;
    this.surname = obj ? (obj.surname ? obj.surname : null) : null;
    this.phone = obj ? (obj.phone ? obj.phone : null) : null;
    this.website = obj ? (obj.website ? obj.website : null) : null;
    this.sex = obj ? (obj.sex ? obj.sex : null) : null;
    this.cni = obj ? (obj.cni ? obj.cni : null) : null;
    this.photo = obj ? (obj.photo ? obj.photo : null) : null;
    this.birthday = obj ? (obj.birthday ? obj.birthday : null) : null;
  }
}
