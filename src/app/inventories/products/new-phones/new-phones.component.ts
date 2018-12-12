import {Component, OnInit} from '@angular/core';
import {Portable} from '../../../models/manage-stocks/portable.model';
import {MeasureUnit} from '../../../models/manage-stocks/measure-unit.model';
import {Emplacement} from '../../../models/manage-stocks/emplacement.model';
import {Systemos} from '../../../models/manage-stocks/system-os.model';
import {Camera} from '../../../models/manage-stocks/camera.model';
import {Memory} from '../../../models/manage-stocks/memory.model';
import {Cpu} from '../../../models/manage-stocks/cpu.model';
import {PortableServices} from '../../../services/portable.services';
import {ProductServices} from '../products.services';
import {Router} from '@angular/router';
import {GenericCategory} from '../../../models/manage-stocks/category.model';
import {MeasureService} from '../../configuration/measure/measure.service';
import {ProductCategoryService} from '../../configuration/product-category/product-category.service';
import {AccountsService} from '../../../accounts/accounts.service';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {AppColor} from '../../../models/manage-stocks/app-color.model';
import {State} from '../../../models/manage-stocks/state.model';

@Component({
  selector: 'app-new-phones',
  templateUrl: './new-phones.component.html',
  styleUrls: ['./new-phones.component.scss']
})
export class NewPhonesComponent implements OnInit {
  portable: Portable = new Portable(null);
  listEmplacement: Array<Emplacement>;
  listMeasureUnit: Array<MeasureUnit>;
  listProductCategory: Array<GenericCategory>;
  listPortableCategory: Array<GenericCategory>;
  listSystemOs: Array<Systemos>;
  listCpu: Array<Cpu>;
  listMemory: Array<Memory>;
  listCamera: Array<Camera>;
  editOrCreatePhone = 'Create';
  mode = 1;
  listColor: Array<AppColor>;
  listState: Array<State>;
  public phoneFile: any = File;
  url: any;


  constructor(public portableServices: PortableServices,
              public productService: ProductServices,
              public measureService: MeasureService,
              public accountService: AccountsService,
              public auth: AuthenticationService,
              public productCategoryService: ProductCategoryService,
              public router: Router) {
  }


  ngOnInit() {
    this.init();
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
  /*savePortable() {
    this.portableServices.savePortable(this.portable)
      .subscribe(data => {
          this.portable = data.json();
        },
        err => {
          console.log(err);
        });
    this.router.navigate(['inventories/products/phones']);
  }*/
  onselectFile(event) {
    const file = <File>event.target.files[0];
     console.log(file);
    this.phoneFile = file;
  }
   savePortable() {
    console.log(this.phoneFile);
    console.log(this.portable);
    const formData = new FormData();
    formData.append('portable', JSON.stringify(this.portable));
    formData.append('file', this.phoneFile);
    this.productService.saveUserProfile(formData).subscribe(data => {
      this.portable = data.json();
      this.router.navigate(['inventories/products/phones']);
    },
    err => {
      console.log(err);
    });
  }
  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
