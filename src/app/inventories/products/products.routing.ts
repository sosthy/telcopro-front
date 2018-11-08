import {ProductsComponent} from './products.component';
import {PhonesComponent} from './phones/phones.component.';
import {NewPhonesComponent} from './new-phones/new-phones.component';

export const ProductsRoutes = [{
  path: '',
    children: [{
      path: '',
      component: ProductsComponent,
      data: {
        heading: 'Products'
      },
      children: [
        {path: 'phones', component: PhonesComponent, data: {heading: 'Phones'}},
        {path: 'new-phones', component: NewPhonesComponent, data: {heading: 'New-Phones'}}
      ]
    }]
}];
