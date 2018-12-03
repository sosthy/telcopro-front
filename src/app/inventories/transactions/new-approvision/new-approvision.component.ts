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


@Component({
  selector: 'app-new-approvision',
  templateUrl: './new-approvision.component.html',
  styleUrls: ['./new-approvision.component.scss']
})
export class NewApprovisionComponent implements OnInit {
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
              public employeeService: EmployeeService,
              public recipientService: RecipientServices,
              public productServices: ProductServices) {}


  ngOnInit() {
    this.init();
  }

  init() {

    this.productServices.listAllStocks().subscribe(resp => {
      this.listProduct = resp;
    });

    this.transactionService.getAllType().subscribe(resp => {
      this.listMouvmentType = resp;
      this.listMouvmentType.forEach(type => {
        if(type.name == 'APPROVISIONNEMENT') {
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
  }

  onAddMouvmentLine() {
    this.mouvmentLine.quantity = 0;
    this.mouvmentLine.priceTotal = 0;
    // this.totalMouvmentPrice = this.totalMouvmentPrice + this.mouvmentLine.product.priceUnit;
    if(this.mouvmentLine.id){
      this.mouvment.mouvmentLines.forEach(mLine => {
        if(mLine.id === this.mouvmentLine.id){
          const index: number = this.mouvment.mouvmentLines.indexOf(mLine);
          if (index !== -1) {
            this.mouvment.mouvmentLines[index] = this.mouvmentLine;
          }
        }
      })
    }else {
      if(!this.mouvment.mouvmentLines){
        this.mouvment.mouvmentLines = new Array();
      }
      this.mouvmentLine.priceUnit = this.mouvmentLine.product.priceUnit;
      this.mouvment.mouvmentLines.push(this.mouvmentLine);
    }

    this.mouvmentLine = new MouvmentLine();
    this.modalRef.close();
  }

  onAddMouvmentLineItem(){
    this.mouvmentLine.productsItem.push(this.portableItem);
    this.mouvmentLine.quantity = this.mouvmentLine.productsItem.length;
    this.mouvmentLine.priceTotal = this.mouvmentLine.productsItem.length * this.mouvmentLine.product.priceUnit;
    console.log(this.mouvmentLine);
    this.portableItem = new  PortableItem();
    this.modalRef.close();
  }

  open(content, mouvmentLine?: MouvmentLine) {
    if (mouvmentLine) {
      this.mouvmentLine = mouvmentLine;
      this.productServices.getAllPortableItemsOfPortable(this.mouvmentLine.product.id).subscribe(resp => {
        this.listPortableItem = resp.json();
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

  saveMouvment(){
    console.log(this.mouvment);
    this.transactionService.saveMouvment(this.mouvment).subscribe(resp => {
      console.log(resp);
    });
  }

}
