import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {Recipient} from '../../models/manage-stocks/recipient.model';
import {AuthenticationService} from '../../authentication/authentication.service';
import {TELCOPRO_URL} from '../../models/config.model';

@Injectable()
export class RecipientsService {
  constructor(private http: Http, private auth: AuthenticationService) {
  }
  // ===================================Listing et sauvegarde des recipients==============================================

  getAllRecip() {
    return this.http.get(TELCOPRO_URL + '/stocks/recipients', this.auth.getHeaders()).map(res => res.json());
  }

  saveRecipient(recipient: Recipient) {
    return this.http.post(TELCOPRO_URL + '/stocks/recipients', recipient, this.auth.getHeaders()).map(res => res.json());
  }

  // ====================================Suppression et récupération d'un recipient======================================

  getRecip(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/recipients' + id, this.auth.getHeaders()).map(res => res.json());;
  }

  deleteRecip(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/recipients/' + id, this.auth.getHeaders())
      .timeout(1000).map(res => res.json());
  }
  searchRecipients(motCle: string) {
    return this.http.get(TELCOPRO_URL + '/stocks/recipients/search?mc=' + motCle, this.auth.getHeaders()).map(res => res.json());
  }
}
