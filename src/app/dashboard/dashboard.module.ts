import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {DashboardComponent} from './dashboard.component';
import {DashboardRoutes} from './dashboard.routing';
import {AccountsService} from "../accounts/accounts.service";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(DashboardRoutes)],
  declarations: [DashboardComponent],
  providers: [AccountsService]
})

export class DashboardModule {}
