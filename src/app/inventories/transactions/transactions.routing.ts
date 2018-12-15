

import {Routes} from "@angular/router";
import {TransactionsListComponent} from "./transactions-list/transactions-list.component";
import {NewTransactionComponent} from "./new-transaction/new-transaction.component";
import {TransactionComponent} from "./transactions.component";
import {NewApprovisionComponent} from "./new-approvision/new-approvision.component";
import {NewLivraisonComponent} from "./new-livraison/new-livraison.component";
import {NewTransfertComponent} from "./new-transfert/new-transfert.component";

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
        path: 'register',
        component: NewTransactionComponent,
        data : {
          heading: 'New Transaction'
        }
      }, {
        path: 'new-approvision',
        component: NewApprovisionComponent,
        data : {
          heading: 'New Approvision'
        }
      }, {
        path: 'new-livraison',
        component: NewLivraisonComponent,
        data : {
          heading: 'New Livraison'
        }
      }, {
        path: 'new-transfert',
        component: NewTransfertComponent,
        data : {
          heading: 'New Transfert'
        }
      }
    ]
  }
];
