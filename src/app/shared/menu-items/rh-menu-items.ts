import {Menu} from "./menu-items";
import {Injectable} from "@angular/core";

const RHMENUITEMS = [
  {
    state: 'dashboard-rh',
    name: 'HOME',
    type: 'link',
    icon: 'basic-accelerator'
  },
  {
    state: 'work-spaces',
    name: 'Work Spaces',
    type: 'link',
    icon: 'home',
  },
  {
    state: 'employees',
    name: 'Employees',
    type: 'link',
    icon: 'users', // FontAWesome library
  },
  {
    state: 'recrutments',
    name: 'Recrutments',
    type: 'link',
    icon: 'archive'
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
