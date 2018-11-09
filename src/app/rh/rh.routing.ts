import {RhDashboardComponent} from './dashboard-rh/dashboard-rh.component';
import {Routes} from '@angular/router';
import {EmployeesComponent} from './employees/employees.component';

export const RhRoutes: Routes = [{
  path: 'dashboard-rh',
  component: RhDashboardComponent,
  loadChildren: './dashboard-rh/dashboard-rh.module#RhDashboardModule'
}, {
  path: 'employees',
  component: EmployeesComponent,
  loadChildren: './employees/employees.module#EmployeesModule'
}, {
  path: '**',
  redirectTo: 'dashboard-rh'
}]
