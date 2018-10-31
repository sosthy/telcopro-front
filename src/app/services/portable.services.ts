import {Http, RequestOptions} from '@angular/http';
import {Injectable} from '@angular/core';
import {Portable} from '../models/manage-stocks/portable.model';
import {Camera} from '../models/manage-stocks/camera.model';
import {SystemOs} from '../models/manage-stocks/system-os.model';
import {MeasureUnit} from '../models/manage-stocks/measure-unit.model';
import {PortableCategory} from '../models/manage-stocks/portable-category.model';
import {AuthenticationService} from '../authentication/authentication.service';


@Injectable()
export class PortableServices {


  constructor(public http: Http, public authenticationService: AuthenticationService) {

  }


  // ====================================================Listing et sauvegarde des portables=============================

  listAllPortable() {
    return this.http.get('http://localhost:8080/stocks/portables', this.authenticationService.getHeaders());
  }

  savePortable(portable: Portable) {
    return this.http.post('http://localhost:8080/stocks/portables', portable, this.authenticationService.getHeaders());
  }

// ===============================================Suppression et récupération d'un portable==============================

  deletePortable(id: number) {
    return this.http.delete('http://localhost:8080/stocks/portables' + id,
      this.authenticationService.getHeaders());
  }

  listPortable(id: number) {
    return this.http.get('http://localhost:8080/stocks/portables' + id,
      this.authenticationService.getHeaders());
  }

  updatePortable(portable: Portable) {
    return this.http.post('http://localhost:8080/stocks/portables', portable,
      this.authenticationService.getHeaders());
  }

  // ==========================================Listing des emplacements d'un portable donné==============================

  listEmplPorta(id: number) {
    return this.http.get('http://localhost:8080/stocks/portables/emplacement-of-portable' + id,
      this.authenticationService.getHeaders());
  }

  // ============================================Listing des mouvements d'un portable donné==============================

  listMvtPorta(id: number) {
    return this.http.get('http://localhost:8080/stocks/portables/mouvment-of-portable' + id,
      this.authenticationService.getHeaders());
  }

  // ============================================Listing et sauvegarde des cameras=======================================

  listAllCamera() {
    return this.http.get('http://localhost:8080/stocks/portables/cameras',
      this.authenticationService.getHeaders());
  }

  saveCamera(camera: Camera) {
    return this.http.post('http://localhost:8080/stocks/portables/cameras', camera,
      this.authenticationService.getHeaders());
  }

  // =================================================Suppression et récupération d'une camera===========================

  listCamera(id: number) {
    return this.http.get('http://localhost:8080/stocks/portables/cameras' + id,
      this.authenticationService.getHeaders());
  }

 /*  deleteCamera(id:number)
  {
    return this.http.get('http://localhost:8080/stocks/portables/cameras'+id);
  }
  */

 updatecamera(camera: Camera) {
   return this.http.post('http://localhost:8080/stocks/portables/cameras', camera,
     this.authenticationService.getHeaders());
 }

// ====================================================Listing et sauvegarde des systemOS================================

  listAllSystemOs() {
    return this.http.get('http://localhost:8080/stocks/portables/systemos',
      this.authenticationService.getHeaders());
  }

  saveSystemOs(systemOs: SystemOs) {
    return this.http.post('http://localhost:8080/stocks/portables/systemos', systemOs,
      this.authenticationService.getHeaders());
  }

  // ===========================================Suppression et récupération d'un systemOS================================

  listSystemOs(id: number) {
    return this.http.get('http://localhost:8080/stocks/portables/systemos' + id,
      this.authenticationService.getHeaders());
  }

  deleteSystemOs(id: number) {
    return this.http.delete('http://localhost:8080/stocks/portables/systemos' + id,
       this.authenticationService.getHeaders());
  }

  updateSystemOs(systemOs: SystemOs) {
    return this.http.post('http://localhost:8080/stocks/portables/systemos', systemOs,
      this.authenticationService.getHeaders());
  }

  // ========================================Listing et sauvegarde des unités liés au portable===========================

  listAllMeasureUnit() {
      return this.http.get('http://localhost:8080/stocks/portables/units',
        this.authenticationService.getHeaders());
  }

  saveMeasureUnit(measureUnit: MeasureUnit) {
    return this.http.post('http://localhost:8080/stocks/portables/units', measureUnit,
      this.authenticationService.getHeaders());
  }

  // =======================================Suppression et récupération d'une unité liés au portable ====================

  listMeasusreUnit(id: number) {
    return this.http.get('http://localhost:8080/stocks/portables/units' + id,
       this.authenticationService.getHeaders());
  }

  deleteMeasureUnit(id: number) {
    return this.http.delete('http://localhost:8080/stocks/portables/units' + id,
      this.authenticationService.getHeaders());
  }

  updateMeasureUnit(measureUnit: MeasureUnit) {
    return this.http.post('http://localhost:8080/stocks/portables/units', measureUnit,
       this.authenticationService.getHeaders());
  }

  // =========================================Listing et sauvegarde des catégories de portable===========================

  listAllcatPorta() {
    return this.http.get('http://localhost:8080/stocks/portables/categories',
      this.authenticationService.getHeaders());
  }
  saveCatPort(portCat: PortableCategory) {
    return this.http.post('http://localhost:8080/stocks/portables/categories', portCat,
      this.authenticationService.getHeaders());
  }

  // ============================================Suppression et récupération d'une catégorie de portable=================

  listCatPorta(id: number) {
    return this.http.get('http://localhost:8080/stocks/portables/categories' + id,
       this.authenticationService.getHeaders());
  }

  deleteCatPorta(id: number) {
    return this.http.delete('http://localhost:8080/stocks/portables/categories/1' + id,
      this.authenticationService.getHeaders());
  }

  updateCatPorta(portCat: PortableCategory) {
    return this.http.post('http://localhost:8080/stocks/portables/categories', portCat,
      this.authenticationService.getHeaders());
  }

  // =========================================Listing des portables d'une couleur donnée=================================

  listColorPorta(name: string) {
    return this.http.get('http://localhost:8080/stocks/portables/color' + name,
      this.authenticationService.getHeaders());
  }


}
