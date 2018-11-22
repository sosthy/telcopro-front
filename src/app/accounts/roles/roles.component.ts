import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {AccountsService} from '../accounts.service';
import {AppRole} from '../../models/approle.model';
import {Employee} from '../../models/employee.model';
import { AppMenu } from '../../models/appmenu.model';


@Component({
  selector: 'app-accounts',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  password: string;
  menusSel: Array<AppMenu> = new Array();
  menuSelected: Array<AppMenu> = new Array();
  menusRemoved: Array<AppMenu> = new Array();
  roles: Array<AppRole> = new Array();
  role: AppRole = new AppRole();
  menus: Array<AppMenu> = new Array();
  employee = '';
  employeeSelected: Array<Employee> = new Array();
  employees: Array<Employee> = new Array();
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private accountsSerice: AccountsService) {}

  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create Role';
    this.password = '********';
    this.init();
  }

  async init() {
    this.role = new AppRole();
    this.menusSel = new Array();
    this.menuSelected = new Array();
    this.menusRemoved = new Array();

    this.roles = await this.accountsSerice.getAllRoles().toPromise();
    this.menus = await this.accountsSerice.getAllMenus().toPromise();
  }

  open(content, role?: AppRole) {
    this.role = role ? new AppRole(role) : new AppRole();
    if (role) {
      this.role.menus.forEach(menu => {
        this.menus.forEach(m => {
          if (m.name === menu.name) {
            const index: number = this.menus.indexOf(m);
            if (index !== -1) {
              this.menus.splice(index, 1);
            }
          }
        });
      });
    }

    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.init();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onCreateUser(): void {
    this.addEditCardHeader = 'Create Role';
    this.mode = 4;
  }

  onListUser(): void {
    this.mode = 1;
  }

  onDetailsUser(id: number): void {
    this.mode = 2;
  }

  async onSaveRole() {
    if (this.role.id) {
      const data = await this.accountsSerice.saveRole(this.role).toPromise();
      const index: number = this.roles.indexOf(this.role);
      if (index !== -1) {
        this.roles[index] = data;
      }
    } else {
      const data = await this.accountsSerice.saveRole(this.role).toPromise();
    }
    this.init();
    this.modalRef.close();
  }

  onDeleteRole() {
    this.accountsSerice.deleteRole(this.role.id).subscribe(data => {
      this.roles.forEach(r => {
        if (r.roleName === data.name) {
          const index: number = this.roles.indexOf(r);
          if (index !== -1) {
            this.roles.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }

  addMenu() {
    this.menusSel.forEach(menu => {
      if (menu) {
        if (this.menus.find(m => m === menu)) {
          this.role.menus.push(menu);
        }
        const index: number = this.menus.indexOf(menu);
        if (index !== -1) {
          this.menus.splice(index, 1);
        }
      }
    });
  }

  onRoleChanged(role: string) {

  }

  clearSelectedMenu() {
    this.menusRemoved.forEach(menu => {
      const index: number = this.role.menus.indexOf(menu);
      if (index !== -1) {
        this.role.menus.splice(index, 1);
      }
      this.menus.push(menu);
      this.menusRemoved = null;
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
