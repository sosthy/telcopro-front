import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsRoutes} from './products.routing';
import {PortableServices} from '../../services/portable.services';
import {ProductsComponent} from './products.component';
import {PhonesComponent} from './phones/phones.component.';
import {NewPhonesComponent} from './new-phones/new-phones.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  imports:
    [CommonModule,
      RouterModule.forChild(ProductsRoutes),
      FormsModule
    ],
  declarations: [ProductsComponent, PhonesComponent, NewPhonesComponent],
  providers: [PortableServices],

})

export class ProductsModule {

}
