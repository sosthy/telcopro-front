

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {State} from '../../../models/manage-stocks/state.model';
import {StateService} from './state.service';
import {Product} from '../../../models/manage-stocks/product.model';
import {FormController} from '../../../services/form-controller.services';

@Component({
  selector: 'app-state-product',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent extends FormController implements OnInit {
  public data: any[];
  closeResult: string;
  addEditCardHeader: string;
  states: Array<State> = new Array();
  tableMessage = 'Loading.... Please wait!';
  state: State = new State();
  modalRef: NgbModalRef;
  motCle: string;
  // ------------------------------------------------------  ------------------------------------------------------------------
  constructor(private modalService: NgbModal, private stateService: StateService) { super(); }
  // ------------------------------------------------------ -------------------------------------------------------------------
  ngOnInit(): void {
    this.addEditCardHeader = 'Add State';
    this.init();
  }
  // ------------------------------------------------------ --------------------------------------------------------------------
  async init() {
    this.state = new State();
    this.states = await this.stateService.getAllState().toPromise();
  }
  // -------------------------------------------------------- ------------------------------------------------------------------
  open(content, sta?: State) {
    this.state = sta ? new State(sta) : new State();
    this.initForm();
    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.init();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // ------------------------------------------------------------- -------------------------------------------------------------
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  // ------------------------------------------------------------------- ------------------------------------------------------
  async onSaveState() {
    const data = await this.stateService.saveState(this.state).toPromise();
    if (this.state.id) {
      const index: number = this.states.indexOf(this.state);
      if (index !== -1) {
        this.states[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  // ----------------------------------------------------------------------------------------------------------------------------
  onDeleteState() {
    this.stateService.deleteState(this.state.id).subscribe(data => {
      this.states.forEach(sta => {
        if (sta.name === data.name) {
          const index: number = this.states.indexOf(sta);
          if (index !== -1) {
            this.states.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  searchState() {
    this.stateService.searchStates(this.motCle)
      .subscribe(data => {
        this.states = data;
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        });
  }
   compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  initForm() {
    if (!super.formInit()) {
      super.defaultForm('name');
    }
    if (!this.state.id) {
      this.addEditCardHeader = 'Add State';
      super.resetForm();
    } else {
      this.addEditCardHeader = 'Edit State';
      super.markFormControlsAsTouched();
    }
  }
}
