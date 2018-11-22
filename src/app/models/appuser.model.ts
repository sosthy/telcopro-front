
import { Employee } from './employee.model';
import { AppRole } from './approle.model';

export class AppUser {
  id: number;
  username: string;
  password: string;
  email: string;
  lockStatus: boolean;
  employee: Employee;
  roles: Array<AppRole>;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.username = obj ? (obj.username ? obj.username : '') : '';
    this.password = obj ? (obj.password ? obj.password : '') : '';
    this.email = obj ? (obj.email ? obj.email : '') : '';
    this.lockStatus = obj ? (obj.lockStatus ? obj.lockStatus : true) : true;
    this.employee = obj ? (obj.employee ? obj.employee : new Employee()) : new Employee();
    this.roles = obj ? (obj.roles ? obj.roles : []) : [];
  }

}


