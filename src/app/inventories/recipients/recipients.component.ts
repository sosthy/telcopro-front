import {Component, OnInit} from '@angular/core';
import {Recipient} from 'app/models/manage-stocks/recipient.model';
import {RecipientGroupe} from '../../models/manage-stocks/recipient-groupe.model';
import {Mouvment} from '../../models/manage-stocks/mouvment.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {RecipientsService} from './recipients.service';
import {RecipientsGroupeService} from '../configuration/recipients-groupe/recipients-groupe.service';
import {MouvmentServices} from '../../services/mouvment.services';
import {Router} from '@angular/router';
import {ResourceService} from '../../services/resource.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAX_LENGHT_CARD_TEXT} from '../../models/config.model';


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
  tableMessage = 'Loading.... Please wait!';
  mouvement: Mouvment;
  mouvements: Array<Mouvment> = new Array();
  modalRef: NgbModalRef;
  motCle: string;
  public recipientFile: any = File;
  image = [];
  imageName = [];
  form: FormGroup;
  MAX_LENGHT_CARD_TEXT = MAX_LENGHT_CARD_TEXT;
  // -------------------------------- -----------------------------------------------------------------------------------------
  constructor(private fb: FormBuilder,
              private modalService: NgbModal, private recipientsService: RecipientsService,
              private recipientsGroupeService: RecipientsGroupeService,
              public resourceService: ResourceService, private mouvmentService: MouvmentServices, public router: Router) {
  }

  // --------------------------------------- ----------------------------------------------------------------------------------
  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create Recipient';
    this.init();
  }

  // ----------------------------------------- -----------------------------------------------------------------------------------
  async init() {
    this.getImages();
    this.recipients = await this.recipientsService.getAllRecip().toPromise();
    this.groupes = await this.recipientsGroupeService.getAllGroup().toPromise();
    this.mouvements = await this.mouvmentService.listAllMvt().toPromise();
  }
   open(content, rec?: Recipient, mode?: number) {
    this.recipient = rec ? new Recipient(rec) : new Recipient();
    if (rec) {
      if (mode === 1) {
        this.addEditCardHeader = 'Edit ' + rec.groupe.name;
        this.initForm();
      } else if (mode === 2) {
        this.addEditCardHeader = 'Delete ' + rec.groupe.name;
      } else {
        this.addEditCardHeader = 'Detail ' + rec.groupe.name;
      }
    } else {
      this.addEditCardHeader = 'Add Fournisseur/Client';
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
        if (r.designation === data.designation) {
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
    this.recipientsService.searchRecipients(this.motCle)
      .subscribe(data => {
        this.recipients = data;
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        });
  }
   onselectFile(event) {
    const file = <File>event.target.files[0];
     console.log(file);
    this.recipientFile = file;
  }
  async saveRecipient() {
    this.recipient.groupe = this.form.controls['selectedGroup'].value;
    const formData = new FormData();
    formData.append('recipient', JSON.stringify(this.recipient));
    formData.append('file', this.recipientFile);
    const data = await this.recipientsService.saveUserProfile(formData).toPromise();
    if (this.recipient.id) {
      const index: number = this.recipients.indexOf(this.recipient);
      if (index !== -1) {
        this.recipients[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  getImages() {
    this.image = [];
    this.imageName = [];
    this.resourceService.downloads('DIRECTORY_RECIPIENTS_IMAGES')
      .subscribe(res => {
        let indiceDelimiteur = 0;
        res.json().forEach(data => {
          indiceDelimiteur = data.indexOf('$');
          if (indiceDelimiteur !== -1) {
            this.imageName.push(data.substr(0, indiceDelimiteur));
            this.image.push(data.substr(indiceDelimiteur + 1));
          }
        });
        console.log(this.image);
        console.log(this.imageName);
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
  }
  initForm() {
    if (!this.form || this.addEditCardHeader.includes('Add')) {
      this.form = this.fb.group({
        'recipientDesignation': [null, Validators.required],
        'recipientWeb': [null, Validators.compose([Validators.required])],
        'recipientPhone': [null, Validators.compose([Validators.required])],
        'selectedGroup': [null, Validators.compose([Validators.required])],
        'recipientLocation': [null, Validators.compose([Validators.required])]
      });
    }
    if (this.addEditCardHeader.includes('Edit')) {
      for (const i in this.form.controls) {
        this.form.controls[i].markAsTouched();
      }
    }
  }
  arrangeClass(nameInput) {
    return  this.isUnValid(nameInput) ? 'is-invalid' : (this.form.controls[nameInput].touched ? 'is-valid' : '');
  }
  isUnValid(nameInput) {
    return !this.form.controls[nameInput].valid && this.form.controls[nameInput].touched;
  }
}
