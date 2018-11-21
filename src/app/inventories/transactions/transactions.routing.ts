

import {Routes} from "@angular/router";
import {TransactionsListComponent} from "./transactions-list/transactions-list.component";
import {NewTransactionComponent} from "./new-transaction/new-transaction.component";
import {TransactionComponent} from "./transactions.component";

export const TRANSACTIONSROUTES: Routes = [
  {
    path: '',
    component: TransactionComponent,
    children: [
      {
        path: '',
        component: TransactionsListComponent,
        data : {
          heading: 'Transactions'
        }
      }, {
        path: 'new-transaction',
        component: NewTransactionComponent,
        data : {
          heading: 'New Transaction'
        }
      }
    ]
  }
];
