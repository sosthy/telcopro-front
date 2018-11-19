import {Mouvment} from './mouvment.model';
import {RecipientGroupe} from './recipient-groupe.model';

export class Recipient {
  id: number;
  website: string;
  designation: string;
  phone: string;
  location: string;
  groupe: RecipientGroupe;
  mouvements: Mouvment;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.website = obj ? (obj.website ? obj.website : '') : '';
    this.designation = obj ? (obj.designation ? obj.designation : '') : '';
    this.phone = obj ? (obj.phone ? obj.phone : '') : '';
    this.location = obj ? (obj.location ? obj.location : '') : '';
    this.groupe = obj ? (obj.groupe ? obj.groupe : new RecipientGroupe()) : new RecipientGroupe();
    this.mouvements = obj ? (obj.id ? obj.id : new Mouvment()) : new Mouvment();
  }
}
