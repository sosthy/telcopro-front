import {TELCOPRO_URL} from '../../../models/config.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {State} from '../../../models/manage-stocks/state.model';

@Injectable()
export class StateService {

  constructor(private http: Http, private auth: AuthenticationService) {
  }
  // ===========================Listing, Modification et Sauvegarde des états d'un produit  ===============================
  getAllState() {
    return this.http.get(TELCOPRO_URL + '/stocks/states', this.auth.getHeaders()).map(res => res.json());
  }
  saveState(state: State) {
    return this.http.post(TELCOPRO_URL + '/stocks/states', state, this.auth.getHeaders()).map(res => res.json());
  }
  // ==============================Suppression et récupération d'un élément d'un état=======================================
  getState(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/states' + id, this.auth.getHeaders());
  }
   deleteState(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/states' + id, this.auth.getHeaders()).timeout(1000).map(res => res.json());
  }
}
