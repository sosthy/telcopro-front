

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Memory} from '../../../models/manage-stocks/memory.model';
import {MemoryService} from './memory.service';


@Component({
  selector: 'app-memory',
  templateUrl: './memory.component.html',
  styleUrls: ['./memory.component.scss']
})
export class MemoryComponent implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  memories: Array<Memory> = new Array();
  tableMessage = 'Loading.... Please wait!';
  memory: Memory = new Memory();
  modalRef: NgbModalRef;
  motCle: String;
   constructor(private modalService: NgbModal, private memoryService: MemoryService) {}
   ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create Memory';
    this.init();
  }
  // ------------------------------------------ ------------------------------------------------------------------------------------
   async init() {
    this.memory = new Memory();
    this.memories = await this.memoryService.getAllMemory().toPromise();
  }
  // ---------------------------------------- -----------------------------------------------------------------------------------
  open(content, mem?: Memory) {
    this.memory = mem ? new Memory(mem) : new Memory();

    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.init();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // ------------------------------------------- -------------------------------------------------------------------------------
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  // --------------------------------------- -----------------------------------------------------------------------------------
   async onSaveMemory() {
    const data = await this.memoryService.saveMemory(this.memory).toPromise();
    if (this.memory.id) {
      const index: number = this.memories.indexOf(this.memory);
      if (index !== -1) {
        this.memories[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  // -------------------------------------------- ----------------------------------------------------------------------------
  onDeleteMemory() {
    this.memoryService.deleteMemory(this.memory.id).subscribe(data => {
      this.memories.forEach(m => {
        if (m.id === data.id) {
          const index: number = this.memories.indexOf(m);
          if (index !== -1) {
            this.memories.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  searchMemory() {
     this.memoryService.searchMemories(this.motCle)
       .subscribe(data => {
         this.memories = data;
          this.tableMessage = 'No results matching';
       },
         err => {
         console.log(err);
         });
  }
}
