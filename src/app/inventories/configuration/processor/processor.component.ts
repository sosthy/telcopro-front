

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ProcessorService} from './processor.service';
import {Cpu} from '../../../models/manage-stocks/cpu.model';

@Component({
  selector: 'app-processor',
  templateUrl: './processor.component.html',
  styleUrls: ['./processor.component.scss']
})
export class ProcessorComponent implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  processors: Array<Cpu> = new Array();
  tableMessage = 'Loading.... Please wait!';
  processor: Cpu = new Cpu();
  modalRef: NgbModalRef;
  motCle: string;
  constructor(private modalService: NgbModal, private processorService: ProcessorService) {}
  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create Processor';
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
}
