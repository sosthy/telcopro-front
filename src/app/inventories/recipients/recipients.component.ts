import {Component, OnInit} from '@angular/core';
import {Recipient} from 'app/models/manage-stocks/recipient.model';
import {Employee} from '../../models/employee.model';
import {RecipientGroupe} from '../../models/manage-stocks/recipient-groupe.model';
import {Mouvment} from '../../models/manage-stocks/mouvment.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {RecipientsService} from './recipients.service';
import {AppUser} from '../../models/appuser.model';
import {RecipientsGroupeService} from '../configuration/recipients-groupe/recipients-groupe.service';
import {MouvmentServices} from '../../services/mouvment.services';
import {Camera} from '../../models/manage-stocks/camera.model';


@Component({
  selector: 'app-recipients',
  templateUrl: './recipients.component.html',
  styleUrls: ['./recipients.component.scss']
})

export class RecipientsComponent implements OnInit {
  recipient: Recipient = new Recipient();
  recipients: Array<Recipient> = new Array();
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  groupe: RecipientGroupe;
  groupes: Array<RecipientGroupe> = new Array();
  mouvement: Mouvment;
  mouvements: Array<Mouvment> = new Array();
  modalRef: NgbModalRef;
  motCle: string;

  // -------------------------------- -----------------------------------------------------------------------------------------
  constructor(private modalService: NgbModal, private recipientsService: RecipientsService,
              private recipientsGroupeService: RecipientsGroupeService, private mouvmentService: MouvmentServices) {
  }

  // --------------------------------------- ----------------------------------------------------------------------------------
  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create Recipient';
    this.init();
  }

  // ----------------------------------------- -----------------------------------------------------------------------------------
  async init() {
    // this.recipient = new Recipient();
    this.recipients = await this.recipientsService.getAllRecip().toPromise();
    this.groupes = await this.recipientsGroupeService.getAllGroup().toPromise();
    this.mouvements = await this.mouvmentService.listAllMvt().toPromise();
  }
  // ----------------------------------- ---------------------------------------------------------------------------------------
   // ----------------------------- --------------------------------------------------------------------------------------------
   /*open(content, rec?: Recipient) {
    this.recipient = rec ? new Recipient(rec) : new Recipient();

    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.init();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }*/
   open(content, rec?: Recipient, mode?: number) {
    this.recipient = rec ? new Recipient(rec) : new Recipient();
    if (rec) {
      if (mode === 1) {
        this.addEditCardHeader = 'Edit Fournisseur/Client';
      } else {
        this.addEditCardHeader = 'Delete Fournisseur/Client';
      }
    } else {
      this.addEditCardHeader = 'Create Fournisseur/Client';
    }

    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.init();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // ----------------------------------- --------------------------------------------------------------------------------------
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  async onSaveRecipient() {
    const data = await this.recipientsService.saveRecipient(this.recipient).toPromise();
    if (this.recipient.id) {
      const index: number = this.recipients.indexOf(this.recipient);
      if (index !== -1) {
        this.recipients[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  // --------------------------------- ------------------------------------------------------------------------------------------
  onDeleteRecipient() {
    this.recipientsService.deleteRecip(this.recipient.id).subscribe(data => {
      this.recipients.forEach(r => {
        if (r.name === data.name) {
          const index: number = this.recipients.indexOf(r);
          if (index !== -1) {
            this.recipients.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  searchRecipient() {
    console.log(this.motCle);
    this.recipientsService.searchRecipients(this.motCle)
      .subscribe(data => {
        this.recipients = data;
      },
        err => {
        console.log(err);
        });
  }
}
