

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {State} from '../../../models/manage-stocks/state.model';
import {StateService} from './state.service';
import {Product} from '../../../models/manage-stocks/product.model';

@Component({
  selector: 'app-state-product',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.scss']
})
export class StateComponent implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  states: Array<State> = new Array();
  state: State = new State();
  modalRef: NgbModalRef;
  motCle: string;
  // ------------------------------------------------------  ------------------------------------------------------------------
  constructor(private modalService: NgbModal, private stateService: StateService) {}
  // ------------------------------------------------------ -------------------------------------------------------------------
  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create State';
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
      },
        err => {
        console.log(err);
        });
  }
   compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
