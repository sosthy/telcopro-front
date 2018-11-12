import {StocksDashboardComponent} from './dashboard-stocks/dashboard-stocks.component';
import {Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';
import {ConfigurationComponent} from "./configuration/configuration.component";

export const InventoriesRoutes: Routes = [{
  path: 'dashboard-stocks',
  component: StocksDashboardComponent,
  loadChildren: './dashboard-stocks/dashboard-stocks.module#StocksDashboardModule'
}, {
  path: 'products',
  component: ProductsComponent,
  loadChildren: './products/products.module#ProductsModule'
}, {
  path: 'configurations',
  component: ConfigurationComponent,
  loadChildren: './configuration/configuration.module#ConfigurationModule'
}, {
  path: '**',
  redirectTo: 'dashboard-stocks'
}]
