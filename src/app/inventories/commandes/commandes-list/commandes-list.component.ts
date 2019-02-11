
import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbPanelChangeEvent} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {Recipient} from '../../../models/manage-stocks/recipient.model';
import {Commande} from '../../../models/manage-stocks/commande.model';
import {CommandeService} from '../commande.service';
import {MouvmentType} from '../../../models/manage-stocks/mouvment-type.model';
import {TransactionService} from '../../transactions/transaction.service';
import {ResourceService} from '../../../services/resource.service';

@Component({
  selector: 'app-commandes-list',
  templateUrl: './commandes-list.component.html',
  styleUrls: ['./commandes-list.component.scss']
})
export class CommandesListComponent implements OnInit {

  acc: any;
  modalRef: any;
  closeResult: any;
  listMouvmentType: Array<MouvmentType> = new Array();
  textMessage = 'Loading.... Please wait!';
  listRecipient: Array<Recipient> = new Array();
  listCommande: Array<Commande> = new Array();
  commande: Commande = new Commande();

  constructor(public modalService: NgbModal,
              public router: Router,
              public commandeService: CommandeService,
              public resourceService: ResourceService,
              public transactionService: TransactionService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.commandeService.getAllCommande().subscribe(resp => {
      this.listCommande = resp;
    });

    this.transactionService.getAllType().subscribe(resp => {
      this.listMouvmentType = resp;
    });
  }

  open(content, commande?: Commande) {
    if (commande) {
      this.commande = commande;
    }
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

  newCommandeForm() {
    this.router.navigateByUrl('/inventories/commandes/register');
  }

  makeApprovision() {
    this.router.navigateByUrl('/inventories/commandes/commandes-approvision');
  }

  makeTransfert() {
    this.router.navigateByUrl('/inventories/commandes/commandes-transfert');
  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === '2') {
      $event.preventDefault();
    }
    if ($event.panelId === '3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

  newLivraison() {
    this.router.navigateByUrl('/inventories/commandes/commandes-livraison');
  }

  onEditCommande(commande) {
    if (commande.commandeType.name === 'APPROVISIONNEMENT') {
      this.router.navigate(['inventories/commandes/commandes-approvision'], { queryParams: {reference: commande.reference} });
    } else if (commande.commandeType.name === 'LIVRAISON') {
      this.router.navigate(['inventories/commandes/commandes-livraison'], {queryParams: {reference: commande.reference}});
    }

  }

  onDeleteCommande() {
    this.commandeService.deleteCommande(this.commande).subscribe(resp => {
      if (resp) {
        this.listCommande.forEach(item => {
          if (item.reference === this.commande.reference) {
            const index = this.listCommande.indexOf(item);
            if (index !== -1) {
              this.listCommande.splice(index, 1);
            }
          }
        });
        this.modalRef.close();
      }
    });
  }
  download(fileName) {
    // const fullName = fileName + '.pdf';
    const fullName = 'test.pdf';
    this.resourceService.downloadFile(fullName).subscribe((resp) => {
      console.log(resp);
      const file = new Blob([resp['_body']], { type: 'application/pdf' });
      console.log(file);
      window.open(URL.createObjectURL(file), '_blank');
    });
  }
}
