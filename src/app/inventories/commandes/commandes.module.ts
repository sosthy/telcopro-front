

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {COMMANDESROUTES} from './commandes.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbCalendar, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommandeComponent} from './commandes.component';
import {RecipientServices} from '../../services/recipient.services';
import {AuthenticationService} from '../../authentication/authentication.service';
import {AccountsService} from '../../accounts/accounts.service';
import {EmployeeService} from '../../services/employee.services';
import {FilterPipe, SortByPipe} from '../../pipe';

import {WorkSpaceService} from '../../services/workSpace.services';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {CommandeService} from './commande.service';
import {TransactionService} from '../transactions/transaction.service';
import {CommandesListComponent} from './commandes-list/commandes-list.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(COMMANDESROUTES),
    FormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    CommandeComponent,
    CommandesListComponent
  ],
  providers: [CommandeService, TransactionService, RecipientServices, AccountsService, AuthenticationService, EmployeeService,
    WorkSpaceService]
})
export class CommandeModule { }
