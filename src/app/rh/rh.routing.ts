import {RhDashboardComponent} from './dashboard-rh/dashboard-rh.component';
import {Routes} from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';
import {WorkSpacesComponent} from './work-spaces/work-spaces.component';

export const RhRoutes: Routes = [{
  path: 'dashboard-rh',
  component: RhDashboardComponent,
  loadChildren: './dashboard-rh/dashboard-rh.module#RhDashboardModule'
}, {
  path: 'employees',
  component: EmployeesComponent,
  loadChildren: './employees/employees.module#EmployeesModule'
}, {
  path: 'work-spaces',
  component: WorkSpacesComponent,
  loadChildren: './work-spaces/work-spaces.module#WorkSpacesModule'
}, {
  path: '**',
  redirectTo: 'dashboard-rh'
}]
