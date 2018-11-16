

import {Injectable} from "@angular/core";
import {AuthenticationService} from "../../authentication/authentication.service";
import {Http} from "@angular/http";
import {TELCOPRO_URL} from "../../models/config.model";
import {GenericEntrepot} from "../../models/manage-stocks/entrepot.model";

@Injectable()
export class EntrepotService {

  constructor(public http: Http, public authenticationService: AuthenticationService) { }

  listAllEntrepots() {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots', this.authenticationService.getHeaders()).map(res => res.json());
  }

  deleteEntrepot(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/entrepots/' + id, this.authenticationService.getHeaders()).map(res => res.json());
  }

  saveEntrepot(entrepot: GenericEntrepot) {
    return this.http.post(TELCOPRO_URL + '/stocks/entrepots', entrepot, this.authenticationService.getHeaders()).map(res => res.json());
  }

  listAllEmplacement(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/emplacements-of-entrepot/' + id, this.authenticationService.getHeaders()).map(res => res.json());
  }

  deleteEmplacement(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/entrepots/emplacements/' + id, this.authenticationService.getHeaders()).map(res => res.json());
  }

  saveEmplacement(entrepot: GenericEntrepot) {
    return this.http.post(TELCOPRO_URL + '/stocks/entrepots/emplacements', entrepot, this.authenticationService.getHeaders()).map(res => res.json());
  }
  search(keyWords) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/search?mc=' + keyWords, this.authenticationService.getHeaders());
  }
  searchEmplacement(keyWords) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/emplacements/search?mc=' + keyWords, this.authenticationService.getHeaders());
  }
}
