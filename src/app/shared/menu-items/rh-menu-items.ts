import {Menu} from './menu-items';
import {Injectable} from '@angular/core';

const RHMENUITEMS = [
  {
    state: 'dashboard-rh',
    name: 'HOME',
    type: 'link',
    icon: ' fa fa-tachometer'
  },
  {
    state: 'work-spaces',
    name: 'Work Spaces',
    type: 'link',
    icon: ' fa fa-home',
  },
  {
    state: 'employees',
    name: 'Employees',
    type: 'link',
    icon: ' fa fa-users', // FontAWesome library
  },
  {
    state: 'recrutments',
    name: 'Recrutments',
    type: 'link',
    icon: ' fa fa-handshake-o'
  }
];

@Injectable()
export class RhMenuItems {

  constructor() {

  }

  getAllRhMenu(): Menu[] {
    return RHMENUITEMS;
  }

}
