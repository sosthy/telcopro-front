import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {GenericEntrepot} from '../models/manage-stocks/entrepot.model';
import {Emplacement} from '../models/manage-stocks/emplacement.model';
import {AuthenticationService} from '../authentication/authentication.service';
import {TELCOPRO_URL} from '../models/config.model';

@Injectable()
export class EntrepotServices {

  constructor(public http: Http, public authenticationService: AuthenticationService) {

  }

  /*===================================================entrepot=========================================================*/

  listEntrepot() {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots', this.authenticationService.getHeaders());
  }

  followEntrepot(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/' + id, this.authenticationService.getHeaders());
  }

  deleteEntrepot(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/entrepots/' + id, this.authenticationService.getHeaders());
  }

  saveEntrepot(entrepot: GenericEntrepot) {
    return this.http.post(TELCOPRO_URL + '/stocks/entrepots', entrepot, this.authenticationService.getHeaders());
  }

  updateEntrepot(entrepot: GenericEntrepot) {
    return this.http.post(TELCOPRO_URL + '/stocks/entrepots', entrepot, this.authenticationService.getHeaders());
  }
  /*=================================================entrpot============================================================*/


  /*=================================================emplacemet=========================================================*/

  listEmplOfAllEntr() {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/emplacements', this.authenticationService.getHeaders());
  }

  saveEmplOfEntr(emplacement: Emplacement) {
    return this.http.post(TELCOPRO_URL + '/stocks/entrepots/emplacements', emplacement, this.authenticationService.getHeaders());
  }

  updateEmplOfEntr(emplacement: Emplacement) {
    return this.http.post(TELCOPRO_URL + '/stocks/entrepots/emplacements', emplacement, this.authenticationService.getHeaders());
  }

  followEmplOfEntr(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/emplacements' + id, this.authenticationService.getHeaders());
  }

  deleteEmplOfEntr(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/entrepots/emplacements' + id, this.authenticationService.getHeaders());
  }

  // ==========================================================end=======================================================


  // ==============================Nombre de produit dans un emplacement d'un entrepot===================================

  listCntPrdctOfEmpl(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/emplacements/count-product-of-emplacement' + id,
      this.authenticationService.getHeaders());
  }
  // ============================end=====================================================================================


  // ==================================Listing des produits d'un emplacement dans un entrepôt============================

  listPrdctOfEmpl(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/emplacements/products-of-emplacement' + id,
      this.authenticationService.getHeaders());
  }
  // ======================================end===========================================================================

  // ===========================================Nombre de portables dans un emplacement d'un entrepôt====================

  countPortItemOfEmpl(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/emplacements/count-portable-items-of-emplacement' + id,
      this.authenticationService.getHeaders());
  }

  // =========================================end========================================================================

  // =================================Listing des mouvements concernant un entrepôt donné================================

  listMvtOfEntr(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/mouvments-of-entrepot' + id,
      this.authenticationService.getHeaders());
  }

  // ====================================================================================================================

  // ==================================Listing de tous les produits d'un entrepôt donné==================================

  listPrdctOfEntr(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/mouvments-of-entrepot' + id,
      this.authenticationService.getHeaders());
  }

  // ====================================================================================================================

  // ===============================Nombre des produits d'un entrepôt donné==============================================

  cntPrdctOfEntr(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/count-product-of-entrepot' + id,
      this.authenticationService.getHeaders());
  }
// ======================================================================================================================



// ==================================================Nombre de portables d'un entrepôt===================================
  cntPortItemOfEntr(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/count-portable-items-of-entrepot' + id,
      this.authenticationService.getHeaders());
  }


// ==================================list des emplacements d'un entrepot=================================================

  listEmplOfEntr(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/entrepots/emplacements-of-entrepot' + id,
      this.authenticationService.getHeaders());
  }
  // ====================================================================================================================

  // ====================================Test pour savoir si un entrepôt a encore de l'espace============================

  /*spaceOfEntr(id:number)
  {
    return this.http.get('');
  }*/




}
