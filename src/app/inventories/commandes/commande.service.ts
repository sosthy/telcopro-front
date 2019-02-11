

import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TELCOPRO_URL} from '../../models/config.model';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Commande} from '../../models/manage-stocks/commande.model';
import {MouvmentLine} from '../../models/manage-stocks/mouvment-line.model';

@Injectable()
export class CommandeService {

  constructor(private http: Http, private auth: AuthenticationService) {}

  getAllCommande() {
    return this.http.get(TELCOPRO_URL + '/stocks/commandes', this.auth.getHeaders()).map(resp => resp.json());
  }

  saveCommande(commande: Commande) {
    return this.http.post(TELCOPRO_URL + '/stocks/commandes', commande, this.auth.getHeaders()).map(resp => resp.json());
  }

  deleteCommande(commande: Commande) {
    return this.http.delete(TELCOPRO_URL + '/stocks/commandes/' + commande.reference, this.auth.getHeaders()).map(resp => resp.json());
  }
}
