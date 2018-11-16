import {Mouvment} from './mouvment.model';
import {RecipientGroupe} from './recipient-groupe.model';

export class Recipient {
  id: number;
  name: string;
  surname: string;
  portable: string;
  website: string;
  sex: string;
  cni: string;
  photo: string;
  birthday: Date;
  civility: string;
  designation: string;
  phone: string;
  location: string;
  groupe: RecipientGroupe;
  mouvements: Mouvment;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.name = obj ? (obj.name ? obj.name : '') : '';
    this.surname = obj ? (obj.surname ? obj.surname : '') : '';
    this.website = obj ? (obj.website ? obj.website : '') : '';
    this.sex = obj ? (obj.sex ? obj.sex : '') : '';
    this.cni = obj ? (obj.cni ? obj.cni : '') : '';
    this.phone = obj ? (obj.phone ? obj.phone : '') : '';
    this.photo = obj ? (obj.photo ? obj.photo : '') : '';
    this.birthday = obj ? (obj.birthday ? obj.birthday : Date()) : Date();
    this.civility = obj ? (obj.civility ? obj.civility : '') : '';
    this.designation = obj ? (obj.designation ? obj.designation : '') : '';
    this.phone = obj ? (obj.phone ? obj.phone : '') : '';
    this.location = obj ? (obj.location ? obj.location : '') : '';
    this.groupe = obj ? (obj.groupe ? obj.groupe : new RecipientGroupe()) : new RecipientGroupe();
    this.mouvements = obj ? (obj.id ? obj.id : new Mouvment()) : new Mouvment();
  }
}
