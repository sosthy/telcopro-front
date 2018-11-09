import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {RhRoutes} from './rh.routing';
import {NgModule} from '@angular/core';
import {RhDashboardModule} from './dashboard-rh/dashboard-rh.module';
import {EmployeesModule} from './employees/employees.module';
import {EmployeeService} from '../services/employee.services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RhRoutes),
    RhDashboardModule,
    EmployeesModule
  ],
  declarations: [ ],
  providers: [EmployeeService]
})

export class RhModule {}
