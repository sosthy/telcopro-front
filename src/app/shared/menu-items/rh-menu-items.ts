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
    state: 'employees',
    name: 'Employees',
    type: 'link',
    icon: 'basic-lock-open',
  },
  {
    state: 'recrutments',
    name: 'Recrutments',
    type: 'link',
    icon: 'basic-sheet-txt'
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
