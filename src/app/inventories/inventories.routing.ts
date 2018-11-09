import {StocksDashboardComponent} from './dashboard-stocks/dashboard-stocks.component';
import {Routes} from '@angular/router';
import {ProductsComponent} from './products/products.component';

export const InventoriesRoutes: Routes = [{
  path: 'dashboard-stocks',
  component: StocksDashboardComponent,
  loadChildren: './dashboard-stocks/dashboard-stocks.module#StocksDashboardModule'
}, {
  path: 'products',
  component: ProductsComponent,
  loadChildren: './products/products.module#ProductsModule'
}, {
  path: '**',
  redirectTo: 'dashboard-stocks'
}]
