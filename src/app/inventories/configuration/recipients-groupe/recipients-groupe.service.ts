import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {TELCOPRO_URL} from '../../../models/config.model';
import {RecipientGroupe} from '../../../models/manage-stocks/recipient-groupe.model';

@Injectable()
export class RecipientsGroupeService {

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  // =================================Listing des recipients d'un groupe=================================================

  getRecipGroup(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/recipients/recipients-of-groupe' + id,
      this.auth.getHeaders()).map(res => res.json());
  }

  // ==================================Ajoute un recipient à un groupe=====pas fini==============

  saveRecipGroup(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/stocks/recipients /add-recipient-to-groupe?recipient=' +
      ' {idrecipient}&groupe= {idgroupe}' + id,
      this.auth.getHeaders()).map(res => res.json());
  }


  // ===================================listing et sauvegarde des groupes================================================

  getAllGroup() {
    return this.http.get(TELCOPRO_URL + '/stocks/recipients/groupes', this.auth.getHeaders()).map(res => res.json());
  }

  saveGroup(recipientGroupes: RecipientGroupe) {
    return this.http.post(TELCOPRO_URL + '/stocks/recipients/groupes', recipientGroupes,
      this.auth.getHeaders()).map(res => res.json());
  }

  // ================================Suppression et récupération d'un groupe=============================================

  getGroup(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/recipients/groupes' + id,
      this.auth.getHeaders()).map(res => res.json());
  }

  deletegroup(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/recipients/groupes/' + id,
      this.auth.getHeaders()).timeout(1000).map(res => res.json());
  }

  searchGroups(motCle: string) {
    return this.http.get(TELCOPRO_URL + '/stocks/recipients/groupes/search?mc=' + motCle,
      this.auth.getHeaders()).map(res => res.json());
  }
}
