import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {InventoriesRoutes} from './inventories.routing';
import {ProductsComponent} from './products/products.component';
import {StocksDashboardComponent} from './dashboard-stocks/dashboard-stocks.component';
import {StocksDashboardModule} from './dashboard-stocks/dashboard-stocks.module';
import {ProductsModule} from './products/products.module';
import {ConfigurationModule} from "./configuration/configuration.module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(InventoriesRoutes),
    FormsModule,
    ReactiveFormsModule,
    StocksDashboardModule,
    ProductsModule,
    ConfigurationModule
  ],
  declarations: [ ],
})

export class InventoriesModule {}
