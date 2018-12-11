
import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {TransactionService} from '../transaction.service';
import {MouvmentType} from '../../../models/manage-stocks/mouvment-type.model';
import {Recipient} from '../../../models/manage-stocks/recipient.model';
import {Mouvment} from '../../../models/manage-stocks/mouvment.model';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  acc: any;
  modalRef: any;
  closeResult: any;
  listMouvmentType: Array<MouvmentType> = new Array();
  textMessage = 'Loading.... Please wait!';
  listRecipient: Array<Recipient> = new Array();
  listMouvment: Array<Mouvment> = new Array();

  constructor(public modalService: NgbModal,
              public router: Router,
              public transactionService: TransactionService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.transactionService.getAllMouvment().subscribe(resp => {
      this.listMouvment = resp;
    });

    this.transactionService.getAllType().subscribe(resp => {
      this.listMouvmentType = resp;
    });
  }

  open(content) {

    this.modalRef = this.modalService.open(content);
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

  newMouvmentForm() {
    this.router.navigateByUrl('/inventories/transactions/register');
  }

  makeApprovision() {
    this.router.navigateByUrl('/inventories/transactions/new-approvision');
  }

  makeTransfert() {
    this.router.navigateByUrl('/inventories/transactions/new-transfert');
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === '2') {
      $event.preventDefault();
    }
    if ($event.panelId === '3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  newLivraison(){
    this.router.navigateByUrl('/inventories/transactions/new-livraison');
  }

}
