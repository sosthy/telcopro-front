

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
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.surname = obj ? (obj.surname ? obj.surname : '') : '';
    this.phone = obj ? (obj.phone ? obj.phone : '') : '';
    this.website = obj ? (obj.website ? obj.website : '') : '';
    this.sex = obj ? (obj.sex ? obj.sex : 'M') : 'M';
    this.cni = obj ? (obj.cni ? obj.cni : '') : '';
    this.photo = obj ? (obj.photo ? obj.photo : null) : null;
    this.birthday = obj ? (obj.birthday ? obj.birthday : null) : null;
  }
}
