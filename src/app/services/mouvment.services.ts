import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Mouvment} from '../models/manage-stocks/mouvment.model';
import {MouvmentType} from '../models/manage-stocks/mouvment-type.model';
import {MouvmentLine} from '../models/manage-stocks/mouvment-line.model';
import {AuthenticationService} from '../authentication/authentication.service';
import {TELCOPRO_URL} from '../models/config.model';

@Injectable()
export class MouvmentServices {
  constructor(public http: Http,  public authenticationService: AuthenticationService) {

  }

  listAllMvt() {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments', this.authenticationService.getHeaders()).map(res => res.json());
  }

  saveMvt(mouvement: Mouvment) {
    return this.http.post(TELCOPRO_URL + '/stocks/mouvments', mouvement, this.authenticationService.getHeaders()).map(res => res.json());
  }

  listMvt(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments' + id, this.authenticationService.getHeaders()).map(res => res.json());
  }

  deleteMvt(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/mouvments' + id, this.authenticationService.getHeaders());
  }

  update(mouvement: Mouvment) {
    return this.http.post(TELCOPRO_URL + '/stocks/mouvments', mouvement, this.authenticationService.getHeaders())
      .timeout(1000).map(res => res.json());
  }

  // ============================listing des types d'un mouvemet donnee==================================================

  listMvtOfTyp(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/mouvments-of-type' + id,
      this.authenticationService.getHeaders());
  }

  // ===================================================Listing des produits d'un mouvement==============================

  listMvtOfProd(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/products-of-mouvment' + id,
      this.authenticationService.getHeaders());
  }

  // =================================================listing desmouvements effectuees par un employee===================

  listMvtOfEmp(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/mouvments-of-employee' + id,
      this.authenticationService.getHeaders());
  }

  // ==============================================Listing et sauvegarde des types de mouvement==========================

  listAllMvtTyp() {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/types', this.authenticationService.getHeaders());
  }

  saveMvtTyp(mouvementType: MouvmentType) {
    return this.http.post(TELCOPRO_URL + '/stocks/mouvments/types', mouvementType,
      this.authenticationService.getHeaders());
  }

  // ==========================================suppression et modification===============================================

  deleteMvtType(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/mouvments/types' + id,
      this.authenticationService.getHeaders());
  }

  listMvtTyp(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/mouvments-of-type' + id,
      this.authenticationService.getHeaders());
  }

  updateMvtTyp(mouvementType: MouvmentType) {
    return this.http.post(TELCOPRO_URL + '/stocks/mouvments/types', mouvementType,
      this.authenticationService.getHeaders());
  }

  // ====================================Listing et sauvegarde des lignes de commande====================================
  listAllCmdLine() {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/lines',
      this.authenticationService.getHeaders());
  }

  saveCmdLine(mouvementLine: MouvmentLine) {
    return this.http.post(TELCOPRO_URL + '/stocks/mouvments/lines', mouvementLine,
      this.authenticationService.getHeaders());
  }

  // ======================================Suppression et récupération d'une ligne de commande===========================

  deleteCmdLine(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/mouvments/lines' + id,
      this.authenticationService.getHeaders());
  }

  listCmdLine(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/lines-of-types' + id,
      this.authenticationService.getHeaders());
  }

  updateCmdLine(mouvementLine: MouvmentLine) {
    return this.http.post(TELCOPRO_URL + '/stocks/mouvments/lines', mouvementLine,
      this.authenticationService.getHeaders());
  }

  // =======================================Listing des lignes de commande d'un type donné===============================


}
