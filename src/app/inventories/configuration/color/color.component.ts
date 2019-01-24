

import {Component, OnInit} from '@angular/core';
import {Camera} from '../../../models/manage-stocks/camera.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {AppColor} from '../../../models/manage-stocks/app-color.model';
import {CameraService} from '../camera/camera.service';
import {ColorService} from './color.service';
import {FormController} from '../../../services/form-controller.services';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent extends FormController implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  colors: Array<AppColor> = new Array();
  tableMessage = 'Loading.... Please wait!';
  color: AppColor = new AppColor();
  modalRef: NgbModalRef;
  motCle: string;
  constructor(private modalService: NgbModal, private colorService: ColorService) { super(); }
  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Add Color';
    this.init();
  }
  // -----------------------------------------------------------------  -------------------------------------------------------
  async init() {
    this.color = new AppColor();
    this.colors = await this.colorService.getAllappColor().toPromise();
  }
  // ------------------------------------------------------------------ ------------------------------------------------------
   open(content, col?: AppColor) {
    this.color = col ? new AppColor(col) : new AppColor();
    this.initForm();
    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.init();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // ------------------------------------------------- -------------------------------------------------------------------------
   private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  // ------------------------------------------------ ---------------------------------------------------------------------------
  async onSaveColor() {
    const data = await this.colorService.saveAppColor(this.color).toPromise();
    if (this.color.id) {
      const index: number = this.colors.indexOf(this.color);
      if (index !== -1) {
        this.colors[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  // --------------------------------------------------- ---------------------------------------------------------------------
  onDeleteColor() {
    this.colorService.deleteAppColor(this.color.id).subscribe(data => {
      this.colors.forEach(c => {
        if (c.name === data.name) {
          const index: number = this.colors.indexOf(c);
          if (index !== -1) {
            this.colors.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  searchColor() {
    this.colorService.searchColors(this.motCle)
      .subscribe(data => {
        this.colors = data;
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        });
  }
  initForm() {
    if (!super.formInit()) {
      super.defaultForm('colorName');
    }
    if (!this.color.id) {
      this.addEditCardHeader = 'Add Color';
      super.resetForm();
    } else {
      this.addEditCardHeader = 'Edit Color';
      super.markFormControlsAsTouched();
    }
  }
}
