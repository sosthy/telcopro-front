import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {EmployeesComponent} from './employees.component';
import {EmployeesRoutes} from './employees.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(EmployeesRoutes)],
  declarations: [EmployeesComponent]
})

export class EmployeesModule {}
