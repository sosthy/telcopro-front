import { NgModule } from '@angular/core';

import {UsersComponent} from './users/users.component';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import {AccountsRoutes} from './accounts.routing';
import {FormsModule} from '@angular/forms';
import {RolesComponent} from './roles/roles.component';
import {MenusComponent} from './menus/menus.component';
import {AccountsService} from './accounts.service';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ResourceService} from "../services/resource.service";


@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild(AccountsRoutes),
    CommonModule,
    NgxChartsModule,
    NgbModule
  ],
  declarations: [
    UsersComponent,
    RolesComponent,
    MenusComponent,
  ],
  providers: [AccountsService, ResourceService]
})

export class AccountsModule {}
