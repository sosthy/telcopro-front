import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsRoutes} from './products.routing';
import {PortableServices} from '../../services/portable.services';
import {ProductsComponent} from './products.component';
import {PhonesComponent} from './phones/phones.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductServices} from './products.services';
import {EntrepotServices} from '../../services/entrepot.services';
import {AuthenticationService} from '../../authentication/authentication.service';
import {AccountsService} from '../../accounts/accounts.service';
import {PortableItemComponent} from './items/items.component';
import {PortableItemServices} from './items/items.services';
import {EntrepotService} from '../entrepots/entrepots.services';
import {ResourceService} from '../../services/resource.service';

@NgModule({
  imports:
    [CommonModule,
      RouterModule.forChild(ProductsRoutes),
      FormsModule,
      ReactiveFormsModule,
      NgbModule
    ],
  declarations: [ProductsComponent, PhonesComponent, PortableItemComponent],
  providers: [PortableServices, ProductServices, EntrepotServices, AuthenticationService, AccountsService,
    PortableItemServices, EntrepotService, ResourceService],

})

export class ProductsModule {

}
