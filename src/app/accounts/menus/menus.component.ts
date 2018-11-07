import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgbModal, ModalDismissReasons, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {AccountsService} from '../accounts.service';
import {Http} from '@angular/http';
import {AppMenu} from '../../models/appmenu.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AuthenticationService } from '../../authentication/authentication.service';


@Component({
  selector: 'app-accounts',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  public data: any[];
  closeResult: string;
  content: any;
  addEditCardHeader: string;
  menus: Array<AppMenu> = new Array();
  menu: AppMenu = new AppMenu();
  mode = 1;

  constructor(private modalService: NgbModal,
              private accountsSerice: AccountsService) {}

  ngOnInit(): void {
    this.accountsSerice.getAllMenus().subscribe(data => {
      this.menus = data;
    });
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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

  onCreateMenu(): boolean {
    this.accountsSerice.saveMenu(this.menu).subscribe(data => {
      console.log(data);
      this.menus.push(data);
    });
    return true;
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
