import {Component, OnInit} from '@angular/core';
import {Http} from '@angular/http';
import {ActivatedRoute} from '@angular/router';
import {GenericEntrepot} from '../../../models/manage-stocks/entrepot.model';
import {Emplacement} from '../../../models/manage-stocks/emplacement.model';
import {EntrepotService} from '../entrepots.services';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-list-emplacement',
  templateUrl: './list-emplacements.component.html',
  styleUrls: ['./list-emplacements.component.scss']
})
export class EmplacementListComponent implements OnInit {

  entrepot: GenericEntrepot;
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  emplacement: Emplacement = new Emplacement();
  modalRef: NgbModalRef;
  motCle: string;
  listEmplacement: Array<Emplacement> = new Array();
  tableMessage = 'Loading.... Please wait!';

  constructor(public route: ActivatedRoute, private modalService: NgbModal, private entrepotService: EntrepotService) { }

  ngOnInit() {
    this.mode = 1;
    this.addEditCardHeader = 'Create Emplacement';
    this.init();
  }

  // --------------------------------------------------- ----------------------------------------------------------------------
  async init() {
    this.route.params.subscribe(params => {
      if (params['name']) {
        this.entrepot = new GenericEntrepot(params);
        this.entrepotService.listAllEmplacement(this.entrepot.id).subscribe(resp => {
          this.listEmplacement = resp;
        });
      }
    });
  }

  // ---------------------------------------------------- ---------------------------------------------------------------------
  open(content, emp?: Emplacement) {
    this.emplacement = emp ? new Emplacement(emp) : new Emplacement();

    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.init();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // ---------------------------------------------- -----------------------------------------------------------------------------
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // ----------------------------------------------------------------- ----------------------------------------------------------
  async onSaveEmplacement() {
    this.emplacement.entrepot = this.entrepot;
    const data = await this.entrepotService.saveEmplacement(this.emplacement).toPromise();
    if (this.emplacement.id) {
      const index: number = this.listEmplacement.indexOf(this.emplacement);
      if (index !== -1) {
        this.listEmplacement[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }

  // ---------------------------------------------------------------- ---------------------------------------------------------
  onDeleteEmplacement() {
    this.entrepotService.deleteEmplacement(this.emplacement.id).subscribe(data => {
      this.listEmplacement.forEach(s => {
        if (s.id === data.id) {
          const index: number = this.listEmplacement.indexOf(s);
          if (index !== -1) {
            this.listEmplacement.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }

  search() {
    this.entrepotService.searchEmplacement(this.motCle)
      .subscribe(data => {
        this.listEmplacement = [];
        data.json().forEach(emplacement => {
          if (('' + emplacement.entrepot.id) === ('' + this.entrepot.id)) {
              this.listEmplacement.push(emplacement);
          }
        });
        this.tableMessage = 'No results matching';
        },
        err => {
          console.log(err);
        });
  }
}
