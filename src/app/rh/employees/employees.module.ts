import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {EmployeesComponent} from './employees.component';
import {EmployeesRoutes} from './employees.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(EmployeesRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule],
  declarations: [EmployeesComponent]
})

export class EmployeesModule {}
