import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AccountsService} from '../accounts.service';
import { AppUser } from '../../models/appuser.model';
import { Employee } from '../../models/employee.model';
import { AppRole } from '../../models/approle.model';
import {ResourceService} from '../../services/resource.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAX_LENGHT_CARD_TEXT} from '../../models/config.model';


@Component({
  selector: 'app-accounts',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  user: AppUser = new AppUser();
  users: Array<AppUser> = new Array();
  public data: any[];
  closeResult: string;
  mode: number;
  motcle: string;
  addEditCardHeader: string;
  rolesSel: Array<AppRole> = new Array();
  roleSelected: Array<AppRole> = new Array();
  rolSelRemoved: Array<AppRole> = new Array();
  roles: Array<AppRole> = new Array();
  employee: Employee;
  employeeSelected: Array<Employee> = new Array();
  employees: Array<Employee> = new Array();
  modalRef: NgbModalRef;
  image = [];
  imageName = [];
  i = 0;
  form: FormGroup;
  MAX_LENGHT_CARD_TEXT = MAX_LENGHT_CARD_TEXT;
  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              public resourceService: ResourceService, private accountsSerice: AccountsService) {}

  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create User';
    this.init();
  }

  async init() {
    this.getImages();
    this.user = new AppUser();
    this.rolesSel = new Array();
    this.roleSelected = new Array();
    this.rolSelRemoved = new Array();

    this.roles = await this.accountsSerice.getAllRoles().toPromise();
    this.users = await this.accountsSerice.getAllUsers().toPromise();
    this.employees = await this.accountsSerice.getAllEmployees().toPromise();
  }

  open(content, user?: AppUser, mode?: number) {
    this.user = user ? new AppUser(user) : new AppUser();
    if (user) {
      if (mode === 1) {
        this.addEditCardHeader = 'Edit User';
        this.initForm();
      } else if (mode === 2) {
        this.addEditCardHeader = 'Delete User';
      } else {
        this.addEditCardHeader = 'Detail User';
      }

      this.user.roles.forEach(role => {
        this.roles.forEach(r => {
          if (r.roleName === role.roleName) {
            const index: number = this.roles.indexOf(r);
            if (index !== -1) {
              this.roles.splice(index, 1);
            }
          }
        });
      });
    } else {
      this.addEditCardHeader = 'New User';
      this.initForm();
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

  async onSaveUser(form) {
    this.user.employee = this.form.controls['employee'].value;
    if (this.user.id) {
      const data = await this.accountsSerice.saveUser(this.user).toPromise();
      const index: number = this.users.indexOf(this.user);
      if (index !== -1) {
        this.users[index] = data;
      }
    } else {
      const data = await this.accountsSerice.saveUser(this.user).toPromise();
    }
    this.init();
    this.modalRef.close();
  }

  onDeleteUser() {
    this.accountsSerice.deleteUser(this.user.id).subscribe(data => {
      this.users.forEach(user => {
        if (user.username === data.username) {
          const index: number = this.users.indexOf(user);
          if (index !== -1) {
            this.roles.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }

  onListUser(): void {
    this.mode = 1;
  }

  onDetailsUser(id: number): void {
    this.mode = 2;
  }

  addRole() {
      this.rolesSel.forEach(role => {
        if (role) {
          if (this.roles.find(r => r === role)) {
            this.user.roles.push(role);
          }
          const index: number = this.roles.indexOf(role);
          if (index !== -1) {
            this.roles.splice(index, 1);
          }
          this.rolesSel = new Array();
        }
      });
  }

  onRoleChanged(role: string) {

  }

  generatePassword() {
    const length = 8, charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    this.user.password = retVal;
  }
  clearSelectedRole() {
    this.rolSelRemoved.forEach(rol => {
      const index: number = this.user.roles.indexOf(rol);
      if (index !== -1) {
        this.user.roles.splice(index, 1);
      }
      this.roles.push(rol);
      this.rolSelRemoved = new Array();
    });
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  searchUser() {
     this.accountsSerice.searchUsers(this.motcle)
      .subscribe(data => {
        this.users = data;
      },
        err => {
        console.log(err);
        });
  }
  getImages() {
    this.image = [];
    this.imageName = [];
    this.resourceService.downloads('DIRECTORY_EMPLOYEES_IMAGES')
      .subscribe(res => {
        let indiceDelimiteur = 0;
        res.json().forEach(data => {
          indiceDelimiteur = data.indexOf('$');
          if (indiceDelimiteur !== -1) {
            this.imageName.push(data.substr(0, indiceDelimiteur));
            this.image.push(data.substr(indiceDelimiteur + 1));
          }
        });
        },
      err => {
        console.log(err);
      });
  }
  searchImages(fileName: string) {
    for (let i = 0; i < this.imageName.length; i++) {
      if (this.imageName[i] === fileName) {
        return this.image[i];
      }
    }
    return null;
  }
  initForm() {
    if (!this.form || this.addEditCardHeader === 'New User') {
      this.form = this.fb.group({
        'username': [null, Validators.required],
        'email': [null, Validators.compose([Validators.required, Validators.email])],
        'password': [null, Validators.compose([Validators.required])],
        'employee':  [null, Validators.compose([Validators.required])]
      });
    }
    if (this.addEditCardHeader === 'Edit User') {
      for (const i in this.form.controls) {
        this.form.controls[i].markAsTouched();
      }
      this.form.controls['employee'].setValue(this.user.employee);
    }
    this.form.controls['password'].disable();
  }
  arrangeClass(nameInput) {
    return  this.isUnValid(nameInput) ? 'is-invalid' : (this.form.controls[nameInput].touched ? 'is-valid' : '');
  }
  isUnValid(nameInput) {
    return !this.form.controls[nameInput].valid && this.form.controls[nameInput].touched;
  }
  formUnValid() {
    return (!this.form.valid) ? true : (this.user.roles.length === 0) ? true : false;
  }
}
