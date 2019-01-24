

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProcessorService} from './processor.service';
import {Cpu} from '../../../models/manage-stocks/cpu.model';
import {FormController} from '../../../services/form-controller.services';
import {Validators} from '@angular/forms';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.scss']
})
export class ProcessorComponent extends FormController implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  processors: Array<Cpu> = new Array();
  tableMessage = 'Loading.... Please wait!';
  processor: Cpu = new Cpu();
  modalRef: NgbModalRef;
  motCle: string;
  constructor(private modalService: NgbModal, private processorService: ProcessorService) { super(); }
  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Add Processor';
    this.init();
  }
   // -------------------------------------- ------------------------------------------------------------------------------------
  async init() {
    this.processor = new Cpu();
    this.processors = await this.processorService.getAllProcessor().toPromise();
  }
  // ----------------------------- --------------------------------------------------------------------------------------------
   open(content, pro?: Cpu) {
    this.processor = pro ? new Cpu(pro) : new Cpu();
    this.initForm();
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
  async onSaveProcessor() {
    const data = await this.processorService.saveProcessor(this.processor).toPromise();
    if (this.processor.id) {
      const index: number = this.processors.indexOf(this.processor);
      if (index !== -1) {
        this.processors[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  // --------------------------------- ------------------------------------------------------------------------------------------
  onDeleteProcessor() {
    this.processorService.deleteProcessor(this.processor.id).subscribe(data => {
      this.processors.forEach(p => {
        if (p.brand === data.brand) {
          const index: number = this.processors.indexOf(p);
          if (index !== -1) {
            this.processors.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  searchProcessor() {
    this.processorService.searchProcessors(this.motCle)
      .subscribe(data => {
        this.processors = data;
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        });
  }
  initForm() {
    if (!super.formInit()) {
      super.newFormControl('processorFrequency', Validators.compose([Validators.required, Validators.min(0)]));
      super.defaultForm('processorBrand');
    }
    if (!this.processor.id) {
      this.addEditCardHeader = 'Add Processor';
      super.resetForm();
    } else {
      this.addEditCardHeader = 'Edit Processor';
      super.markFormControlsAsTouched();
    }
  }
}
