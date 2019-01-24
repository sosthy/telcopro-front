import {Component, OnInit} from '@angular/core';
import {PortableServices} from '../../../services/portable.services';
import {Http} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Portable} from '../../../models/manage-stocks/portable.model';
import {ProductServices} from '../products.services';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormController} from '../../../services/form-controller.services';
import {ProductCategoryService} from '../../configuration/product-category/product-category.service';
import {AccountsService} from '../../../accounts/accounts.service';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {MeasureService} from '../../configuration/measure/measure.service';
import {Emplacement} from '../../../models/manage-stocks/emplacement.model';
import {MeasureUnit} from '../../../models/manage-stocks/measure-unit.model';
import {GenericCategory} from '../../../models/manage-stocks/category.model';
import {Cpu} from '../../../models/manage-stocks/cpu.model';
import {Memory} from '../../../models/manage-stocks/memory.model';
import {Systemos} from '../../../models/manage-stocks/system-os.model';
import {Camera} from '../../../models/manage-stocks/camera.model';
import {AppColor} from '../../../models/manage-stocks/app-color.model';
import {State} from '../../../models/manage-stocks/state.model';
import {MAX_LENGHT_CARD_TEXT} from '../../../models/config.model';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})

export class PhonesComponent extends FormController implements OnInit {
  tableMessage = 'Loading.... Please wait!';
  motcle: string;
  portable: Portable;
  closeResult: string;
  addEditCardHeader: string;
  modalRef: NgbModalRef;
  mode = 1;
  listPortables = new Array<Portable>();
  listEmplacement: Array<Emplacement>;
  listMeasureUnit: Array<MeasureUnit>;
  listProductCategory: Array<GenericCategory>;
  listPortableCategory: Array<GenericCategory>;
  listSystemOs: Array<Systemos>;
  listCpu: Array<Cpu>;
  listMemory: Array<Memory>;
  listCamera: Array<Camera>;
  listColor: Array<AppColor>;
  listState: Array<State>;
  public phoneFile: any = File;
  public image: any = [];
  public imageName: any = [];
  MAX_LENGHT_CARD_TEXT = MAX_LENGHT_CARD_TEXT;
  constructor(private modalService: NgbModal,
              public http: Http,
              public portableservices: PortableServices,
              public productServices: ProductServices,
              public portableServices: PortableServices,
              public productService: ProductServices,
              public measureService: MeasureService,
              public accountService: AccountsService,
              public auth: AuthenticationService,
              public productCategoryService: ProductCategoryService,
              public router: Router) { super(); }
  ngOnInit() {
    this.getImages();
    this.showPhones();
    this.init();
  }
  showPhones() {
    this.portableservices.listAllPortable()
      .subscribe(data => {
        this.listPortables = data.json();
        console.log(this.listPortables);
      },
        err => {
        console.log(err);
        }
        );
  }
   open(content, port?: Portable, mode?: number) {
    this.portable = port ? new Portable(port) : new Portable();
    if (port) {
      if (mode === 1) {
        this.addEditCardHeader = 'Edit Phone Stock';
        this.modalRef = this.modalService.open(content, {backdrop: 'static', size: 'lg', windowClass: 'modal-xl'});
        this.initForm();
      } else if (mode === 2) {
        this.addEditCardHeader = 'Delete Phone Stock';
        this.modalRef = this.modalService.open(content, {backdrop: 'static'});
      } else {
        this.addEditCardHeader = 'Detail Phone Stock';
        this.modalRef = this.modalService.open(content, {backdrop: 'static', size: 'lg', windowClass: 'modal-xl'});
      }
    } else {
      this.addEditCardHeader = 'Add Phone Stock';
      this.modalRef = this.modalService.open(content, {backdrop: 'static', size: 'lg', windowClass: 'modal-xl'});
        this.initForm();
    }

    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.showPhones();
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
  getImages() {
    this.productServices.getImages()
      .subscribe(res => {
        let indiceDelimiteur = 0;
        res.json().forEach(data => {
          indiceDelimiteur = data.indexOf('$');
          if (indiceDelimiteur !== -1) {
            this.imageName.push(data.substr(0, indiceDelimiteur));
            this.image.push(data.substr(indiceDelimiteur + 1));
          }
        });
         // this.image = res.json();
        console.log(this.image);
        console.log(this.imageName);
        },
      err => {
        console.log(err);
      });
  }
  searchImages(fileName: string) {
    for (let i = 0; i < this.imageName.length; i++) {
      if (this.imageName[i] === fileName) {
        return this.image[i];
      }
    }
    return null;
  }
  search() {
    this.portableservices.searchPortable(this.motcle)
      .subscribe(data => {
        this.listPortables = data.json();
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        });
  }
  onDeletePhone() {
    this.portableservices.deletePortable(this.portable.id)
    .subscribe(data => {
      this.listPortables.splice(
        this.listPortables.findIndex((item) => item.id === this.portable.id), 1
      );
    },
    err => {
    });
    this.modalRef.close();
  }
  routeToItem(p: Portable) {
    this.router.navigate(['inventories/products/phones', p.id]);
  }
  init() {
    this.accountService.getUser(this.auth.getUserName()).subscribe(resp1 => {
      this.productService.getEmplacementsOfEntrepot(resp1.employee.workSpace.id).subscribe(resp => {
        this.listEmplacement = resp.json();
      });
    });
    this.portableServices.listAllcatPorta()
      .subscribe(data => {
          this.listPortableCategory = data.json();
        },
        err => {
          console.log(err);
        });

    this.measureService.getAllMeasure()
      .subscribe(data => {
          this.listMeasureUnit = data;
        },
        err => {
          console.log(err);
        });

    this.productCategoryService.getAllProductCategory()
      .subscribe(data => {
          this.listProductCategory = data;
        },
        err => {
          console.log(err);
        });

    this.portableServices.listAllCamera()
      .subscribe(data => {
          this.listCamera = data.json();
        },
        err => {
          console.log(err);
        });

    this.portableServices.listAllSystemos()
      .subscribe(data => {
          this.listSystemOs = data.json();
        },
        err => {
          console.log(err);
        });

    this.portableServices.listAllCpu()
      .subscribe(data => {
          this.listCpu = data.json();
        },
        err => {
          console.log(err);
        });

    this.portableServices.listAllMemory()
      .subscribe(data => {
          this.listMemory = data.json();
        },
        err => {
          console.log(err);
        });
    this.productService.listAllappColor()
      .subscribe(data => {
        this.listColor = data.json();
      },
      err => {
        console.log(err);
      });
    this.productService.listAllState()
      .subscribe(data => {
        this.listState = data.json();
      },
      err => {
        console.log(err);
      });
  }
  onselectFile(event) {
    const file = <File>event.target.files[0];
    this.phoneFile = file;
  }
   savePortable() {
    this.recoverSelectInputValue();
    const formData = new FormData();
    formData.append('portable', JSON.stringify(this.portable));
    formData.append('file', this.phoneFile);
    this.productService.saveUserProfile(formData).subscribe(data => {
      if (!this.portable.id) {
        this.listPortables.push(data.json());
      } else {
        this.listPortables[
          this.listPortables.findIndex((item) => item.id === this.portable.id)
          ] = data.json();
      }
      this.listPortables.sort((p1, p2) => p1.designation < p2.designation ? 1 : -1);
    },
    err => {
      console.log(err);
    });
    this.modalRef.close();
  }
  initForm() {
    if (!super.formInit()) {
      super.defaultForm('designation', 'emplacement'
        , 'volume', 'stk-alert', 'stk-min', 'measure', 'p-categorie', 'state'
        , 'price-unit', 'price-semi-whole', 'price-whole', 'notes', 'ph-categorie'
        , 'ph-color', 'ph-os', 'processor', 'memory', 'camera', 'dimension', 'battery'
        , 'connection', 'iprating', 'sim', 'weight');
      super.addNumberValidatorsToFormControl(1, 'volume', 'stk-alert', 'stk-min'
        , 'price-unit', 'price-semi-whole', 'price-whole', 'dimension', 'weight');
    } else if (this.addEditCardHeader.includes('Add')) {
      super.resetForm();
    }
    if (this.addEditCardHeader.includes('Edit')) {
      this.initSelectInput();
      super.markFormControlsAsTouched();
    }
  }
  initSelectInput() {
      super.setValueFormControl('emplacement', this.portable.emplacement);
      super.setValueFormControl('measure', this.portable.measureUnit);
      super.setValueFormControl('p-categorie', this.portable.productCategory);
      super.setValueFormControl('state', this.portable.state);
      super.setValueFormControl('ph-categorie', this.portable.portableCategory);
      super.setValueFormControl('ph-color', this.portable.appColor);
      super.setValueFormControl('ph-os', this.portable.os);
      super.setValueFormControl('processor', this.portable.cpu);
      super.setValueFormControl('memory', this.portable.memory);
      super.setValueFormControl('camera', this.portable.camera);
  }
  recoverSelectInputValue() {
      this.portable.emplacement = super.getValueFormControl('emplacement');
      this.portable.measureUnit = super.getValueFormControl('measure');
      this.portable.productCategory = super.getValueFormControl('p-categorie');
      this.portable.state = super.getValueFormControl('state');
      this.portable.portableCategory = super.getValueFormControl('ph-categorie');
      this.portable.appColor = super.getValueFormControl('ph-color');
      this.portable.os = super.getValueFormControl('ph-os');
      this.portable.cpu = super.getValueFormControl('processor');
      this.portable.memory = super.getValueFormControl('memory');
      this.portable.camera = super.getValueFormControl('camera');
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  occupationVisibility(portable: Portable) {
    return (portable.quantity <= portable.stockMinim) ? 'border border-danger' :
              ((portable.quantity <= portable.stockAlert) ? 'border border-warning' : 'border border-success');
  }
  occupationMessage(portable: Portable) {
    return (portable.quantity <= portable.stockMinim) ? 'Risk of out of stock.' :
              ((portable.quantity <= portable.stockAlert) ? 'Alert stock reached.' : 'Normal stock.');
  }
}
