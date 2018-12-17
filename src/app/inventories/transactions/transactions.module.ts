

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TRANSACTIONSROUTES} from './transactions.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbCalendar, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransactionComponent} from './transactions.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {NewTransactionComponent} from './new-transaction/new-transaction.component';
import {TransactionService} from './transaction.service';
import {RecipientServices} from '../../services/recipient.services';
import {AuthenticationService} from '../../authentication/authentication.service';
import {AccountsService} from '../../accounts/accounts.service';
import {NewApprovisionComponent} from './new-approvision/new-approvision.component';
import {EmployeeService} from '../../services/employee.services';
import {NewLivraisonComponent} from './new-livraison/new-livraison.component';
import {FilterPipe, SortByPipe} from '../../pipe';

import {WorkSpaceService} from '../../services/workSpace.services';
import {NewTransfertComponent} from './new-transfert/new-transfert.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TRANSACTIONSROUTES),
    FormsModule,
    NgbModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [
    TransactionComponent,
    TransactionsListComponent,
    NewTransactionComponent,
    NewApprovisionComponent,
    NewLivraisonComponent,
    NewTransfertComponent,
    FilterPipe,
    SortByPipe
  ],
  providers: [TransactionService, RecipientServices, AccountsService, AuthenticationService, EmployeeService, WorkSpaceService]
})
export class TransactionModule { }
