import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TELCOPRO_URL} from '../models/config.model';
import {AuthenticationService} from '../authentication/authentication.service';
import { AppMenu } from '../models/appmenu.model';
import 'rxjs/add/operator/timeout';

@Injectable()
export class EmployeeService {

  constructor(private http: Http, private auth: AuthenticationService) {}

  getAllEmployees() {
    return this.http.get(TELCOPRO_URL + '/rh/employees', this.auth.getHeaders());
  }
  getEmployee(id) {
    return this.http.get(TELCOPRO_URL + '/rh/employees/' + id);
  }

  saveEmployee(employee) {
    return this.http.post(TELCOPRO_URL + '/rh/employees', employee);
  }

  deleteEmployee(id) {
    return this.http.delete(TELCOPRO_URL + '/rh/employees' + id);
  }
}
