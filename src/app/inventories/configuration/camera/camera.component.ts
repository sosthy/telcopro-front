
import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Camera} from '../../../models/manage-stocks/camera.model';
import {CameraService} from './camera.service';
import {FormController} from '../../../services/form-controller.services';
import {Validators} from '@angular/forms';


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent extends FormController implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  cameras: Array<Camera> = new Array();
  filter = '';
  tableMessage = 'Loading.... Please wait!';
  camera: Camera = new Camera();
  modalRef: NgbModalRef;
  motCle: string;

  constructor(private modalService: NgbModal, private cameraService: CameraService) { super(); }
  ngOnInit(): void {
    this.mode = 1;
    this.init();
  }
  // -------------------------------------- ------------------------------------------------------------------------------------
  async init() {
    this.camera = new Camera();
    this.cameras = await this.cameraService.getAllCamera().toPromise();
  }
  // ----------------------------- --------------------------------------------------------------------------------------------
   open(content, cam?: Camera) {
    this.camera = cam ? new Camera(cam) : new Camera();

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
  async onSaveCamera() {
    const data = await this.cameraService.saveCamera(this.camera).toPromise();
    if (this.camera.id) {
      const index: number = this.cameras.indexOf(this.camera);
      if (index !== -1) {
        this.cameras[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }
  // --------------------------------- ------------------------------------------------------------------------------------------
  onDeleteCamera() {
    this.cameraService.deleteCamera(this.camera.id).subscribe(data => {
      this.cameras.forEach(c => {
        if (c.backCamera === data.backCamera) {
          const index: number = this.cameras.indexOf(c);
          if (index !== -1) {
            this.cameras.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  searchCamera() {
    this.cameraService.searchCameras(this.motCle)
      .subscribe(data => {
        this.cameras = data;
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        });
  }
  initForm() {
    if (!super.formInit()) {
      super.newFormControl('cameraFront', Validators.compose([Validators.required, Validators.min(0)]));
      super.newFormControl('cameraBack', Validators.compose([Validators.required, Validators.min(0)]));
    }
    if (!this.camera.id) {
      this.addEditCardHeader = 'Add Camera';
      super.resetForm();
    } else {
      this.addEditCardHeader = 'Edit Camera';
      super.markFormControlsAsTouched();
    }
  }
}
