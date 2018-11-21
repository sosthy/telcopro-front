

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TRANSACTIONSROUTES} from "./transactions.routing";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {TransactionComponent} from "./transactions.component";
import {TransactionsListComponent} from "./transactions-list/transactions-list.component";
import {NewTransactionComponent} from "./new-transaction/new-transaction.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(TRANSACTIONSROUTES),
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  declarations: [TransactionComponent, TransactionsListComponent, NewTransactionComponent],
  providers: []
})
export class TransactionModule { }
