import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TELCOPRO_URL} from '../models/config.model';
import {AuthenticationService} from '../authentication/authentication.service';
import 'rxjs/add/operator/timeout';
import {ResourceService} from './resource.service';

@Injectable()
export class EmployeeService {

  constructor(private http: Http, private auth: AuthenticationService, public  resourceService: ResourceService) { }

  getAllEmployees() {
    return this.http.get(TELCOPRO_URL + '/rh/employees', this.auth.getHeaders());
  }
  getEmployee(id) {
    return this.http.get(TELCOPRO_URL + '/rh/employees/' + id, this.auth.getHeaders());
  }

  getEmployeeByUser(id) {
    return this.http.get(TELCOPRO_URL + '/rh/employees/user/' + id, this.auth.getHeaders());
  }

  /*

  saveEmployee(employee: Employee, photo: File) {
    const formData: FormData = new FormData();
    formData.append('photo', photo);
    formData.append('employee', JSON.stringify(employee));
    return this.http.post(TELCOPRO_URL + '/rh/employees', formData, this.auth.getHeaders());
  }
   */
  saveEmployee(formData) {
    return this.http.post(TELCOPRO_URL + '/rh/employees', formData, this.auth.getHeaders());
  }

  getAccountOfEmployee(id) {
    return this.http.get(TELCOPRO_URL + '/rh/employees/' + id, this.auth.getHeaders());
  }

  deleteEmployee(id) {
    return this.http.delete(TELCOPRO_URL + '/rh/employees/' + id, this.auth.getHeaders());
  }
  search(keyWords) {
    return this.http.get(TELCOPRO_URL + '/rh/employees/search?mc=' + keyWords, this.auth.getHeaders());
  }
  upload(photo) {
    return this.http.post(TELCOPRO_URL + '/rh/employees/upload', photo, this.auth.getHeaders());
  }
  saveUserProfile(formData: FormData) {
    return this.http.post(TELCOPRO_URL + '/rh/employees',
      formData, this.auth.getHeadersUpload());
  }
  getImages() {
    return this.resourceService.downloads('DIRECTORY_EMPLOYEES_IMAGES');
  }
}
