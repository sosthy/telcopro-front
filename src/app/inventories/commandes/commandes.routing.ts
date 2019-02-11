

import {Routes} from '@angular/router';
import {CommandesListComponent} from './commandes-list/commandes-list.component';
import {CommandeComponent} from './commandes.component';

export const COMMANDESROUTES: Routes = [
  {
    path: '',
    component: CommandeComponent,
    children: [
      {
        path: '',
        component: CommandesListComponent,
        data : {
          heading: 'Commandes'
        }
      }/*, {
        path: 'register',
        component: CommandesListComponent,
        data : {
          heading: 'New Transaction'
        }
      }, {
        path: 'commandes-approvision',
        component: CommandesListComponent,
        data : {
          heading: 'New Approvision'
        }
      }, {
        path: 'commandes-livraison',
        component: CommandesListComponent,
        data : {
          heading: 'New Livraison'
        }
      }, {
        path: 'commandes-transfert',
        component: CommandesListComponent,
        data : {
          heading: 'New Transfert'
        }
      } */
    ]
  }
];
