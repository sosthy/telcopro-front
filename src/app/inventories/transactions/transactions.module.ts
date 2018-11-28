

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {TRANSACTIONSROUTES} from './transactions.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TransactionComponent} from './transactions.component';
import {TransactionsListComponent} from './transactions-list/transactions-list.component';
import {NewTransactionComponent} from './new-transaction/new-transaction.component';
import {TransactionService} from './transaction.service';
import {RecipientServices} from '../../services/recipient.services';
import {AuthenticationService} from '../../authentication/authentication.service';
import {AccountsService} from '../../accounts/accounts.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TRANSACTIONSROUTES),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [TransactionComponent, TransactionsListComponent, NewTransactionComponent],
  providers: [TransactionService, RecipientServices, AccountsService, AuthenticationService]
})
export class TransactionModule { }
