import { Routes } from '@angular/router';

import {RhDashboardComponent} from './dashboard-rh.component';

export const RhDashboardRoutes: Routes = [{
  path: '',
  component: RhDashboardComponent,
  data: {
    heading: 'Dashboard'
  }
}];
