import { Injectable } from '@angular/core';
import { Menu } from './menu-items';

const STOCKSMENUITEMS = [
  {
    state: 'dashboard-stocks',
    name: 'HOME',
    type: 'link',
    icon: ' fa fa-tachometer'
  },
  {
    state: 'products',
    name: 'PRODUCTS',
    type: 'sub',
    icon: ' fa fa-cubes',
    children: [
      {
        state: 'phones',
        name: 'PHONES'
      },
    ]
  },
  {
    state: 'transactions',
    name: 'TRANSACTIONS',
    type: 'link',
    icon: ' fa fa-map-o',
  },
  {
    state: 'recipients',
    name: 'RECIPIENTS',
    type: 'link',
    icon: ' fa fa-users',
  },
];
const EMPLOYEESMENUITEMS = [
  {
    state: '/',
    name: 'HOME',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: 'employees',
    name: 'employees',
    type: 'sub',
    icon: 'basic-lock-open',
  },
  {
    state: 'docs',
    name: 'DOCS',
    type: 'link',
    icon: 'basic-sheet-txt'
  }
];

@Injectable()
export class StocksMenuItems {

  constructor() {

  }

  getAllStocksMenu(): Menu[] {
    return STOCKSMENUITEMS;
  }

}
