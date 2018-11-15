

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {MeasureUnit} from '../../../models/manage-stocks/measure-unit.model';
import {MeasureService} from './measure.service';
import {Camera} from '../../../models/manage-stocks/camera.model';

@Component({
  selector: 'app-measure',
  templateUrl: './measure.component.html',
  styleUrls: ['./measure.component.scss']
})
export class MeasureComponent implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  measures: Array<MeasureUnit> = new Array();
  measure: MeasureUnit = new MeasureUnit();
  modalRef: NgbModalRef;
  motCle: string;
  constructor(private modalService: NgbModal, private measureService: MeasureService) {}
  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create Measure';
    this.init();
  }
  // -------------------------------------- ------------------------------------------------------------------------------------
  async init() {
    this.measure = new MeasureUnit();
    this.measures = await this.measureService.getAllMeasure().toPromise();
    console.log(this.measures);
  }
  // ----------------------------- --------------------------------------------------------------------------------------------
   open(content, mes?: MeasureUnit) {
    this.measure = mes ? new MeasureUnit(mes) : new MeasureUnit();

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
  // ------------------------------------- -----------------------------------------------------------------------------------
  async onSaveMeasure() {
    const data = await this.measureService.saveMeasure(this.measure).toPromise();
    if (this.measure.id) {
      const index: number = this.measures.indexOf(this.measure);
      if (index !== -1) {
        this.measures[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  // --------------------------------- ------------------------------------------------------------------------------------------
  onDeleteMeasure() {
    this.measureService.deleteMeasure(this.measure.id).subscribe(data => {
      this.measures.forEach(c => {
        if (c.unity === data.unity) {
          const index: number = this.measures.indexOf(c);
          if (index !== -1) {
            this.measures.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  searchMeasure() {
    console.log(this.motCle);
    this.measureService.searchMeasures(this.motCle)
      .subscribe(data => {
        this.measures = data;
      },
        err => {
        console.log(err);
        });
  }
}
