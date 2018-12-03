import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsRoutes} from './products.routing';
import {PortableServices} from '../../services/portable.services';
import {ProductsComponent} from './products.component';
import {PhonesComponent} from './phones/phones.component';
import {NewPhonesComponent} from './new-phones/new-phones.component';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ProductServices} from './products.services';
import {EntrepotServices} from '../../services/entrepot.services';
import {EditPhonesComponent} from './edit-phones/edit-phones.component';
import {AuthenticationService} from '../../authentication/authentication.service';
import {AccountsService} from '../../accounts/accounts.service';
import {PortableItemComponent} from './items/items.component';
import {PortableItemServices} from './items/items.services';
import {EntrepotService} from '../entrepots/entrepots.services';


@NgModule({
  imports:
    [CommonModule,
      RouterModule.forChild(ProductsRoutes),
      FormsModule,
      NgbModule
    ],
  declarations: [ProductsComponent, PhonesComponent, NewPhonesComponent, EditPhonesComponent, PortableItemComponent],
  providers: [PortableServices, ProductServices, EntrepotServices, AuthenticationService, AccountsService,
    PortableItemServices, EntrepotService],

})

export class ProductsModule {

}
