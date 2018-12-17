import {ProductsComponent} from './products.component';
import {PhonesComponent} from './phones/phones.component';
import {NewPhonesComponent} from './new-phones/new-phones.component';
import {EditPhonesComponent} from './edit-phones/edit-phones.component';
import {PortableItemComponent} from './items/items.component';

export const ProductsRoutes = [{
  path: '',
    children: [{
      path: '',
      component: ProductsComponent,
      data: {
        heading: 'Stocks'
      },
      children: [
        {path: 'phones', component: PhonesComponent, data: {heading: 'Phones Stocks'}},
        {path: 'new-phones', component: NewPhonesComponent, data: {heading: 'New Phones Stock'}},
        {path: 'edit-phones/:id', component: EditPhonesComponent, data: {heading: 'Edit Phones Stock'}},
        {path: 'phones/:id', component: PortableItemComponent, data: {heading: 'Items Phones Stock'}}
      ]
    }]
}];
