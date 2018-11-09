import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsRoutes} from './products.routing';
import {PortableServices} from '../../services/portable.services';
import {ProductsComponent} from './products.component';
import {PhonesComponent} from './phones/phones.component.';
import {NewPhonesComponent} from './new-phones/new-phones.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductServices} from '../../services/product.services';
import {EntrepotServices} from '../../services/entrepot.services';


@NgModule({
  imports:
    [CommonModule,
      RouterModule.forChild(ProductsRoutes),
      FormsModule,
      NgbModule
    ],
  declarations: [ProductsComponent, PhonesComponent, NewPhonesComponent],
  providers: [PortableServices, ProductServices, EntrepotServices],

})

export class ProductsModule {

}
