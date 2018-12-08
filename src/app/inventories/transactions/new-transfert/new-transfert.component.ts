import {Component, OnInit} from '@angular/core';
import {Mouvment} from '../../../models/manage-stocks/mouvment.model';
import {MouvmentType} from '../../../models/manage-stocks/mouvment-type.model';
import {Recipient} from '../../../models/manage-stocks/recipient.model';
import {TransactionService} from '../transaction.service';
import {RecipientServices} from '../../../services/recipient.services';
import {MouvmentLine} from '../../../models/manage-stocks/mouvment-line.model';
import {Product} from '../../../models/manage-stocks/product.model';
import {ProductServices} from '../../products/products.services';
import {Router} from '@angular/router';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {PortableItem} from '../../../models/manage-stocks/portable-item.model';

import {AuthenticationService} from '../../../authentication/authentication.service';
import {AccountsService} from '../../../accounts/accounts.service';
import {AppUser} from "../../../models/appuser.model";
import {EmployeeService} from "../../../services/employee.services";
import {PortableItemServices} from "../../products/items/items.services";
import {EntrepotServices} from "../../../services/entrepot.services";
import {WorkSpace} from "../../../models/workSpace.model";
import {WorkSpaceService} from "../../../services/workSpace.services";


@Component({
  selector: 'app-new-transfert',
  templateUrl: './new-transfert.component.html',
  styleUrls: ['./new-transfert.component.scss']
})
export class NewTransfertComponent implements OnInit {
  modalRef: any;
  closeResult: any;
  totalMouvmentPrice = 0;

  listMouvmentType: Array<MouvmentType> = new Array();
  listRecipient: Array<Recipient> = new Array();
  workSpacesView: Array<WorkSpace> = new Array();
  workSpaces: Array<WorkSpace> = new Array();
  listProduct: Array<Product> = new Array();
  mouvment: Mouvment = new Mouvment();
  mouvmentLine: MouvmentLine = new MouvmentLine();
  mouvmentLineToUpdate: MouvmentLine = new MouvmentLine();
  listPortableItem: Array<PortableItem> = new Array();
  listPortableItemSelectedTemp: Array<PortableItem> = new Array();
  listPortableItemRemovedTemp: Array<PortableItem> = new Array();
  portableItem: PortableItem = new PortableItem();
  user = new  AppUser();
  filter = '';

  listItemSel: Array<PortableItem> = new Array();
  listItemSelRemoved: Array<PortableItem> = new Array();


  constructor(public modalService: NgbModal,
              public router: Router,
              private auth: AuthenticationService,
              private accountService: AccountsService,
              public transactionService: TransactionService,
              public recipientService: RecipientServices,
              public workSpaceService: WorkSpaceService,
              public productServices: ProductServices) {}


  ngOnInit() {
    this.init();
  }

  init() {
    this.productServices.listAllStocks().subscribe(resp => {
      this.listProduct = resp;
      this.listProduct.sort((p1, p2) => {
          return p1.designation > p2.designation ? 1 : -1 ;
        });
    });
    this.transactionService.getAllType().subscribe(resp => {
      this.listMouvmentType = resp;
      this.listMouvmentType.forEach(type => {
        if (type.name === 'TRANSFERT') {
          this.mouvment.mouvmentType = type;
        }
      });
    });

    this.recipientService.listAllRecip().subscribe(resp => {
      this.listRecipient = resp.json();
    });

    this.accountService.getUser(this.auth.getUserName()).subscribe(resp => {
      this.user = resp;
      this.mouvment.user = this.user.employee;
    });

    this.workSpaceService.getWorkSpaces()
    .subscribe(data => {
        this.workSpaces = data.json();
        this.workSpaces.sort((w1, w2) => {
          return w1.name > w2.name ? 1 : -1 ; // Rangement par ordre croissant
        });
      },
        err => {
        console.log(err);
        }
        );
    this.mouvment.reference += Date.now();
  }
  onAddMouvmentLine() {
    this.listProduct.splice(this.listProduct.indexOf(this.mouvmentLine.product), 1);
    if (this.mouvmentLine.id) {
      this.mouvment.mouvmentLines.forEach(mLine => {
        if (mLine.id === this.mouvmentLine.id) {
          const index: number = this.mouvment.mouvmentLines.indexOf(mLine);
          if (index !== -1) {
            this.mouvment.mouvmentLines[index] = this.mouvmentLine;
          }
        }
      });
    }else {
        this.mouvmentLine.priceUnit = this.mouvmentLine.product.priceUnit;
        this.mouvmentLine.productsItem = new Array();
        this.mouvment.mouvmentLines.push(this.mouvmentLine);
    }
    this.closeFormItem();
  }

  onAddMouvmentLineItem() {
    this.mouvmentLineToUpdate.quantity = this.listItemSelRemoved.length;
    this.mouvmentLineToUpdate.priceTotal = this.listItemSelRemoved.length * this.mouvmentLine.product.priceUnit;
    this.mouvmentLineToUpdate.productsItem =  this.listItemSelRemoved;
    this.mouvment.priceTotal = this.totalMouvmentPrice;
    this.closeFormItem();
  }

  open(content, mouvmentLine?: MouvmentLine) {
    if (mouvmentLine) {
      mouvmentLine.productsItem.forEach(item => {
        this.listItemSelRemoved.push(new PortableItem(item));
      });
      this.mouvmentLineToUpdate = mouvmentLine;
      this.mouvmentLine = new MouvmentLine(mouvmentLine);
      this.productServices.getAllPortableItemsOfPortable(this.mouvmentLine.product.id).subscribe(resp => {
        this.listPortableItem = new Array();
        resp.json().forEach(item => {
          if (!this.listItemSelRemoved.find(itm => itm.id !== item.id)) {
            this.listPortableItem.push(item);
          }
        });
      });
      this.totalMouvmentPrice = this.mouvment.priceTotal;
    }
    this.modalRef = this.modalService.open(content, {size: 'lg'});
    this.modalRef.result.then((result) => {
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

  saveMouvment() {
    console.log(this.mouvment);
    this.mouvment.mouvmentLines.forEach(ml => {
        if (ml.priceTotal === 0) {
          this.mouvment.mouvmentLines.splice(this.mouvment.mouvmentLines.indexOf(ml), 1);
        }
        this.mouvment.quantity += ml.quantity;
    });
    this.mouvment.entrepotSource = this.mouvment.user.workSpace;
    this.mouvment.recipient = null;
    this.transactionService.saveMouvment(this.mouvment).subscribe(resp => {
      console.log(resp.json());
    });
  }

  addItems() {
    this.listItemSel.forEach(item => {
      if (item) {
        if (!this.listItemSelRemoved.find(r => r.id === item.id)) {
          this.listItemSelRemoved.push(item);
          this.totalMouvmentPrice += this.mouvmentLine.product.priceUnit;
        }
        const index: number = this.listPortableItem.indexOf(item);
        if (index !== -1) {
          this.listPortableItem.splice(index, 1);
        }
        // this.listItemSel =  new Array();
      }
    });
    console.log('addItems listItemSel', this.listItemSel);
  }

  clearSelectedItem() {
    this.listItemSelRemoved.forEach(item => {
      const index: number = this.listItemSelRemoved.indexOf(item);
      if (index !== -1) {
        this.listItemSelRemoved.splice(index, 1);
        this.totalMouvmentPrice -= this.mouvmentLine.product.priceUnit;
      }
      this.listPortableItem.push(item);
    });
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  closeFormItem() {
    this.mouvmentLine.productsItem = new Array();
    this.mouvmentLine = new MouvmentLine();
    this.mouvmentLineToUpdate = new MouvmentLine();
    this.listItemSel  = new Array();
    this.listItemSelRemoved = new Array();
    this.listPortableItem = new Array();
    this.portableItem = new  PortableItem();
    this.modalRef.close();
  }
  removeMouvment() {
    this.mouvment.mouvmentLines.forEach(ml => {
      this.listProduct.push(ml.product);
    });
    this.mouvment = new Mouvment();
  }
  removeMouvmentLine(mouvLine: MouvmentLine) {
      const index: number = this.mouvment.mouvmentLines.indexOf(mouvLine);
      if (index !== -1) {
        this.mouvment.mouvmentLines.splice(index, 1);
        this.mouvment.priceTotal -= mouvLine.priceTotal;
        this.listProduct.push(mouvLine.product);
        this.listProduct.sort((p1, p2) => {
          return p1.designation > p2.designation ? 1 : -1 ;
        });
      }
  }
}
