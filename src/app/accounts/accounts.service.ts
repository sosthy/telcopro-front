import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TELCOPRO_URL} from '../models/config.model';
import {AuthenticationService} from '../authentication/authentication.service';
import { AppMenu } from '../models/appmenu.model';
import 'rxjs/add/operator/timeout';

@Injectable()
export class AccountsService {

  constructor(private http: Http, private auth: AuthenticationService) {}

// ------------------------------------------------------------
  getAllMenus() {
    return this.http.get(TELCOPRO_URL + '/menus', this.auth.getHeaders()).map(res => res.json());
  }

  getMenu(id) {
    return this.http.get(TELCOPRO_URL + '/');
  }

  getMenusOfRole(id) {
    return this.http.get(TELCOPRO_URL + '/menus-of-role/' + id, this.auth.getHeaders()).map(res => res.json());
  }

  saveMenu(menu: AppMenu) {
    return this.http.post(TELCOPRO_URL + '/menus', menu, this.auth.getHeaders()).map(res => res.json());
  }

  deleteMenu(id) {
    return this.http.delete(TELCOPRO_URL + '/');
  }
// ------------------------------------------------------------

  getAllRoles() {
    return this.http.get(TELCOPRO_URL + '/roles', this.auth.getHeaders()).map(res => res.json());
  }

  getRole(id) {
    return this.http.get(TELCOPRO_URL + '/');
  }

  saveRole(menu) {
    return this.http.post(TELCOPRO_URL + '/roles', menu, this.auth.getHeaders()).map(res => res.json());
  }

  deleteRole(id) {
    return this.http.delete(TELCOPRO_URL + '/roles/' + id, this.auth.getHeaders()).timeout(1000).map(res => res.json());
  }
// ------------------------------------------------------------
  getAllUsers() {
    return this.http.get(TELCOPRO_URL + '/users', this.auth.getHeaders()).map(res => res.json());
  }

  getUser(username) {
    return this.http.get(TELCOPRO_URL + '/user-with-username/' + username, this.auth.getHeaders()).map(res => res.json());
  }

  saveUser(user) {
    return this.http.post(TELCOPRO_URL + '/users', user, this.auth.getHeaders()).map(res => res.json());
  }

  deleteUser(id) {
    return this.http.delete(TELCOPRO_URL + '/users/' + id, this.auth.getHeaders()).map(res => res.json());
  }
// -------------------------------------------------------------
  getAllEmployees() {
    return this.http.get(TELCOPRO_URL + '/rh/employees', this.auth.getHeaders()).map(res => res.json());
  }
  getEmployee(id) {
    return this.http.get(TELCOPRO_URL + '/');
  }

  saveEmployee(menu) {
    return this.http.post(TELCOPRO_URL + '/', menu);
  }

  deleteEmployee(id) {
    return this.http.delete(TELCOPRO_URL + '/');
  }
  searchUsers(motCle: string) {
    return this.http.get(TELCOPRO_URL + '/users/search?mc=' + motCle,  this.auth.getHeaders()).map(res => res.json());
  }
}
