

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Systemos} from '../../../models/manage-stocks/system-os.model';
import {SystemosService} from './systemos.service';
import {FormController} from '../../../services/form-controller.services';

@Component({
  selector: 'app-systemos',
  templateUrl: './systemos.component.html',
  styleUrls: ['./systemos.component.scss']
})
export class SystemosComponent extends FormController implements OnInit {
  public data: any[];
  closeResult: string;
  addEditCardHeader: string;
  systemos: Array<Systemos> = new Array();
  tableMessage = 'Loading.... Please wait!';
  systemo: Systemos = new Systemos();
  modalRef: NgbModalRef;
  motCle: string;

  constructor(private modalService: NgbModal, private systemosService: SystemosService) { super(); }

  ngOnInit(): void {
    this.addEditCardHeader = 'Add System Os';
    this.init();
  }

  // --------------------------------------------------- ----------------------------------------------------------------------
  async init() {
    this.systemo = new Systemos();
    this.systemos = await this.systemosService.getAllSystemos().toPromise();
  }

  // ---------------------------------------------------- ---------------------------------------------------------------------
  open(content, sys?: Systemos) {
    this.systemo = sys ? new Systemos(sys) : new Systemos();
    this.initForm();
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
  async onSaveSystemOs() {
    const data = await this.systemosService.saveSystemOs(this.systemo).toPromise();
    if (this.systemo.id) {
      const index: number = this.systemos.indexOf(this.systemo);
      if (index !== -1) {
        this.systemos[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }

  // ---------------------------------------------------------------- ---------------------------------------------------------
  onDeleteSystemOs() {
    this.systemosService.deleteSystemOs(this.systemo.id).subscribe(data => {
      this.systemos.forEach(s => {
        if (s.id === data.id) {
          const index: number = this.systemos.indexOf(s);
          if (index !== -1) {
            this.systemos.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }

  searchSystemO() {
    this.systemosService.searchSystemOs(this.motCle)
      .subscribe(data => {
          this.systemos = data;
          this.tableMessage = 'No results matching';
        },
        err => {
          console.log(err);
        });
  }
  initForm() {
    if (!super.formInit()) {
      super.defaultForm('osName', 'osVersion');
    }
    if (!this.systemo.id) {
      this.addEditCardHeader = 'Add System Os';
      super.resetForm();
    } else {
      this.addEditCardHeader = 'Edit System Os';
      super.markFormControlsAsTouched();
    }
  }
}
