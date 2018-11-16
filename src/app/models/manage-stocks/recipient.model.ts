import {Mouvment} from './mouvment.model';
import {RecipientGroupe} from './recipient-groupe.model';
import {Employee} from '../employee.model';
import {date} from 'ng2-validation/dist/date';

export class  Recipient {
  id: number;
  name: string;
  surname: string;

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
    this.id = obj ? (obj.id ? obj.id : null ) : null;
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
  enterprise: string;
  service: string;
  fonction: string;
  groupe: RecipientGroupe;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.name = obj ? (obj.name ? obj.name : null) : null;
    this.birthday = obj ? (obj.birthday ? obj.birthday : new Date()) : new Date();
    this.surname = obj ? (obj.surname ? obj.surname : null) : null;
    this.portable = obj ? (obj.portable ? obj.portable : null) : null;
    this.website = obj ? (obj.website ? obj.website : null) : null;
    this.sex = obj ? (obj.sex ? obj.sex : null) : null;
    this.cni = obj ? (obj.cni ? obj.cni : null) : null;
    this.phone = obj ? (obj.phone ? obj.phone : null) : null;
    this.photo = obj ? (obj.photo ? obj.photo : null) : null;
    this.civility = obj ? (obj.civility ? obj.civility : null) : null;
    this.enterprise = obj ? (obj.enterprise ? obj.enterprise : null) : null;
    this.groupe = obj ? (obj.groupe ? obj.groupe : null) : null;
    this.fonction = obj ? (obj.fonction ? obj.fonction : null) : null;
    this.service = obj ? (obj.service ? obj.service : null) : null;
  }
}
