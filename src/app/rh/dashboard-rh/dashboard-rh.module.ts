import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {RhDashboardComponent} from './dashboard-rh.component';
import { RhDashboardRoutes } from './dashboard-rh.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RhDashboardRoutes)],
  declarations: [RhDashboardComponent]
})

export class RhDashboardModule {}
