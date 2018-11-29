import {Menu} from './menu-items';
import {Injectable} from '@angular/core';

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
export class EmployeesMenuItems {

  constructor() {

  }

  getAllStocksMenu(): Menu[] {
    return EMPLOYEESMENUITEMS;
  }

  getAllEmployeesMenu(): Menu[] {
    return EMPLOYEESMENUITEMS;
  }

}
