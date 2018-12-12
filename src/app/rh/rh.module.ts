import {RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import {RhRoutes} from './rh.routing';
import {NgModule} from '@angular/core';
import {RhDashboardModule} from './dashboard-rh/dashboard-rh.module';
import {EmployeesModule} from './employees/employees.module';
import {EmployeeService} from '../services/employee.services';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WorkSpacesModule} from './work-spaces/work-spaces.module';
import {WorkSpaceService} from '../services/workSpace.services';
import {ResourceService} from "../services/resource.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(RhRoutes),
    FormsModule,
    ReactiveFormsModule,
    RhDashboardModule,
    EmployeesModule,
    WorkSpacesModule
  ],
  declarations: [ ],
  providers: [EmployeeService, WorkSpaceService, ResourceService]
})

export class RhModule {}
