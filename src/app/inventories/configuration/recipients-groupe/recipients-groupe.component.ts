import {Component, OnInit} from '@angular/core';
import {Camera} from '../../../models/manage-stocks/camera.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {CameraService} from '../camera/camera.service';
import {RecipientsGroupeService} from './recipients-groupe.service';
import {RecipientGroupe} from '../../../models/manage-stocks/recipient-groupe.model';

@Component({
  selector: 'app-recipients-groupe',
  templateUrl: './recipients-groupe.component.html',
  styleUrls: ['./recipients-groupe.component.scss']
})
export class RecipientsGroupeComponent implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  groupes: Array<RecipientGroupe> = new Array();
  tableMessage = 'Loading.... Please wait!';
  groupe: RecipientGroupe = new RecipientGroupe();
  modalRef: NgbModalRef;
  motCle: string;
  // -------------------------------------------  -----------------------------------------------------------------------------
  constructor(private modalService: NgbModal, private recipientsGroupeService: RecipientsGroupeService) {}
  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create Group';
    this.init();
  }
  // -------------------------------------- ----------------------------------------------------------------------------------
  async init() {
    this.groupe = new RecipientGroupe();
    this.groupes = await this.recipientsGroupeService.getAllGroup().toPromise();
  }
  // ----------------------------- --------------------------------------------------------------------------------------------
   open(content, gro?: RecipientGroupe) {
    this.groupe = gro ? new RecipientGroupe(gro) : new RecipientGroupe();

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
  // ------------------------------ --------------------------------------------------------------------------------------------
   // ------------------------------------- -----------------------------------------------------------------------------------
  async onSaveGroup() {
    const data = await this.recipientsGroupeService.saveGroup(this.groupe).toPromise();
    if (this.groupe.id) {
      const index: number = this.groupes.indexOf(this.groupe);
      if (index !== -1) {
        this.groupes[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  // --------------------------------- ------------------------------------------------------------------------------------------
  onDeleteGroup() {
    this.recipientsGroupeService.deletegroup(this.groupe.id).subscribe(data => {
      this.groupes.forEach(g => {
        if (g.name === data.name) {
          const index: number = this.groupes.indexOf(g);
          if (index !== -1) {
            this.groupes.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  searchGroup() {
    this.recipientsGroupeService.searchGroups(this.motCle)
      .subscribe(data => {
        this.groupes = data;
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        });
  }
}
