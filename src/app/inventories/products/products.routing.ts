import {ProductsComponent} from './products.component';
import {PhonesComponent} from './phones/phones.component';
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
        {path: 'phones/:id', component: PortableItemComponent, data: {heading: 'Items Phones Stock'}}
      ]
    }]
}];
