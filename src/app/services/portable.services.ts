import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {Portable} from '../models/manage-stocks/portable.model';
import {Camera} from '../models/manage-stocks/camera.model';
import {Systemos} from '../models/manage-stocks/system-os.model';
import {MeasureUnit} from '../models/manage-stocks/measure-unit.model';
import {AuthenticationService} from '../authentication/authentication.service';
import {TELCOPRO_URL} from '../models/config.model';
import {Memory} from '../models/manage-stocks/memory.model';
import {Cpu} from '../models/manage-stocks/cpu.model';
import {GenericCategory} from "../models/manage-stocks/category.model";


@Injectable()
export class PortableServices {


  constructor(public http: Http, public authenticationService: AuthenticationService) {

  }


  // ====================================================Listing et sauvegarde des portables=============================

  listAllPortable() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables', this.authenticationService.getHeaders());
  }

  savePortable(portable: Portable) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables', portable, this.authenticationService.getHeaders());
  }

// ===============================================Suppression et récupération d'un portable==============================

  deletePortable(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/portables/' + id,
      this.authenticationService.getHeaders());
  }

  listPortable(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables' + id,
      this.authenticationService.getHeaders());
  }

  updatePortable(portable: Portable) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables', portable,
      this.authenticationService.getHeaders());
  }

  // ==========================================Listing des emplacements d'un portable donné==============================

  listEmplPorta(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/emplacement-of-portable' + id,
      this.authenticationService.getHeaders());
  }

  // ============================================Listing des mouvements d'un portable donné==============================

  listMvtPorta(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/mouvment-of-portable' + id,
      this.authenticationService.getHeaders());
  }

  // ============================================Listing et sauvegarde des cameras=======================================

  listAllCamera() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/cameras',
      this.authenticationService.getHeaders());
  }

  saveCamera(camera: Camera) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/cameras', camera,
      this.authenticationService.getHeaders());
  }

  // =================================================Suppression et récupération d'une camera===========================

  listCamera(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/cameras' + id,
      this.authenticationService.getHeaders());
  }

 /*  deleteCamera(id:number)
  {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/cameras'+id);
  }
  */

 updatecamera(camera: Camera) {
   return this.http.post(TELCOPRO_URL + '/stocks/portables/cameras', camera,
     this.authenticationService.getHeaders());
 }

// ====================================================Listing et sauvegarde des systemOS================================

  listAllSystemos() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/system-os',
      this.authenticationService.getHeaders());
  }

  saveSystemOs(systemOs: Systemos) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/systemos', systemOs,
      this.authenticationService.getHeaders());
  }

  // ===========================================Suppression et récupération d'un systemOS================================

  listSystemOs(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/systemos/' + id,
      this.authenticationService.getHeaders());
  }

  deleteSystemOs(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/portables/systemos/' + id,
       this.authenticationService.getHeaders());
  }

  updateSystemOs(systemOs: Systemos) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/systemos/', systemOs,
      this.authenticationService.getHeaders());
  }

  // ========================================Listing et sauvegarde des unités liés au portable===========================

  listAllMeasureUnit() {
      return this.http.get(TELCOPRO_URL + '/stocks/portables/units',
        this.authenticationService.getHeaders());
  }

  saveMeasureUnit(measureUnit: MeasureUnit) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/units', measureUnit,
      this.authenticationService.getHeaders());
  }

  // =======================================Suppression et récupération d'une unité liés au portable ====================

  listMeasusreUnit(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/units/' + id,
       this.authenticationService.getHeaders());
  }

  deleteMeasureUnit(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/portables/units/' + id,
      this.authenticationService.getHeaders());
  }

  updateMeasureUnit(measureUnit: MeasureUnit) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/units', measureUnit,
       this.authenticationService.getHeaders());
  }

  // =========================================Listing et sauvegarde des catégories de portable===========================

  listAllcatPorta() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/categories',
      this.authenticationService.getHeaders());
  }
  saveCatPort(portCat: GenericCategory) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/categories', portCat,
      this.authenticationService.getHeaders());
  }

  // ============================================Suppression et récupération d'une catégorie de portable=================

  listCatPorta(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/categories' + id,
       this.authenticationService.getHeaders());
  }

  deleteCatPorta(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/portables/categories/1' + id,
      this.authenticationService.getHeaders());
  }

  updateCatPorta(portCat: GenericCategory) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/categories', portCat,
      this.authenticationService.getHeaders());
  }

  // =========================================Listing des portables d'une couleur donnée=================================

  listColorPorta(name: string) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/color' + name,
      this.authenticationService.getHeaders());
  }
  // ======================================= Rechercher des portables suivant un mot-clé =======================================
  searchPortable(motCle: string) {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/search?mc=' + motCle, this.authenticationService.getHeaders());
  }
  // ============================Listing, Modification et Sauvegarde des mémoires liés au portable===========================
  listAllMemory() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/memories', this.authenticationService.getHeaders());
  }
  listMemory(id: number) {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/memories' + id, this.authenticationService.getHeaders());
  }
  saveMemory(memory: Memory) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/memories', memory, this.authenticationService.getHeaders());
  }
  deleteMemory(id: number) {
   return this.http.delete(TELCOPRO_URL + '/stocks/portables/memories' + id, this.authenticationService.getHeaders());
  }
  updateMemory(memory: Memory) {
   return this.http.post(TELCOPRO_URL + '/stocks/portables/memories', memory, this.authenticationService.getHeaders());
  }
  // ===========================Listing, Modification et Sauvegarde des cpu liés au portable===================================
  listAllCpu() {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/cpus', this.authenticationService.getHeaders());
  }
  listCpu(id: number) {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/cpus' + id, this.authenticationService.getHeaders());
  }
  saveCpu(cpu: Cpu) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/cpus', cpu, this.authenticationService.getHeaders());
  }
  deleteCpu(id: number) {
   return this.http.delete(TELCOPRO_URL + '/stocks/portables/cpus' + id, this.authenticationService.getHeaders());
  }
  updateCpu(cpu: Cpu) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/cpus', cpu, this.authenticationService.getHeaders());
  }
}
