import {StocksDashboardComponent} from './dashboard-stocks/dashboard-stocks.component';
import {Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ConfigurationComponent} from './configuration/configuration.component';
import {RecipientsComponent} from './recipients/recipients.component';
import {EntrepotComponent} from './entrepots/entrepots.component';
import {TransactionComponent} from "./transactions/transactions.component";


export const InventoriesRoutes: Routes = [{
  path: 'dashboard-stocks',
  component: StocksDashboardComponent,
  loadChildren: './dashboard-stocks/dashboard-stocks.module#StocksDashboardModule'
}, {
  path: 'products',
  component: ProductsComponent,
  loadChildren: './products/products.module#ProductsModule'
}, {
  path: 'entrepots',
  component: EntrepotComponent,
  loadChildren: './entrepots/entrepots.module#EntrepotModule'
}, {
  path: 'configurations',
  component: ConfigurationComponent,
  loadChildren: './configuration/configuration.module#ConfigurationModule'
},
  {
  path: 'recipients',
  component: RecipientsComponent,
  loadChildren: './recipients/recipients.module#RecipientsModule'
}, {
  path: 'transactions',
  component: TransactionComponent,
  loadChildren: './transactions/transactions.module#TransactionModule'
},
  {
  path: '**',
  redirectTo: 'dashboard-stocks'
}];
