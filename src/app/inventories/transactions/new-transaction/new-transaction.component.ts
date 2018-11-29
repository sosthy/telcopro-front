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


@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.scss']
})
export class NewTransactionComponent implements OnInit {
  modalRef: any;
  closeResult: any;
  totalMouvmentPrice = 0;

  listMouvmentType: Array<MouvmentType> = new Array();
  listRecipient: Array<Recipient> = new Array();
  listProduct: Array<Product> = new Array();
  mouvment: Mouvment = new Mouvment();
  mouvmentLine: MouvmentLine = new MouvmentLine();
  listMouvmentLine: Array<MouvmentLine> = new Array();
  listPortableItem: Array<PortableItem> = new Array();
  listPortableItemSelectedTemp: Array<PortableItem> = new Array();
  listPortableItemRemovedTemp: Array<PortableItem> = new Array();
  listPortableItemSelected: Array<PortableItem> = new Array();
  portableItem: PortableItem = new PortableItem();
  user = new  AppUser();


  constructor(public modalService: NgbModal,
              public router: Router,
              private auth: AuthenticationService,
              private accountService: AccountsService,
              public transactionService: TransactionService,
              public recipientService: RecipientServices,
              public productServices: ProductServices) {}


  ngOnInit() {
    this.init();
    this.accountService.getUser(this.auth.getUserName()).subscribe(resp => {
      this.user = resp;
      console.log(this.user);
    });
  }
  init() {

    this.productServices.listAllStocks().subscribe(resp => {
      this.listProduct = resp;
    });

    this.transactionService.getAllType().subscribe(resp => {
      this.listMouvmentType = resp;
    });

    this.recipientService.listAllRecip().subscribe(resp => {
      this.listRecipient = resp.json();
    });
  }
  onAddMouvmentLine() {
    this.mouvmentLine.quantity = 0;
    this.mouvmentLine.priceTotal = 0;
    // this.totalMouvmentPrice = this.totalMouvmentPrice + this.mouvmentLine.product.priceUnit;
    this.listMouvmentLine.push(this.mouvmentLine);
    this.mouvmentLine = new MouvmentLine();
  }
  open(content, mouvmentLine?: MouvmentLine) {
    if (mouvmentLine) {
      this.productServices.getAllPortableItemsOfPortable(this.mouvmentLine.product.id).subscribe(resp => {
        this.listPortableItem = resp.json();
        console.log(this.listPortableItem);
      });
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

}
