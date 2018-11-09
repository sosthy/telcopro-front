import {Component, OnInit} from '@angular/core';
import {Portable} from '../../../models/manage-stocks/portable.model';
import {ProductCategory} from '../../../models/manage-stocks/product-category.model';
import {MeasureUnit} from '../../../models/manage-stocks/measure-unit.model';
import {State} from '../../../models/manage-stocks/state.model';
import {Emplacement} from '../../../models/manage-stocks/emplacement.model';
import {SystemOs} from '../../../models/manage-stocks/system-os.model';
import {Camera} from '../../../models/manage-stocks/camera.model';
import {Memory} from '../../../models/manage-stocks/memory.model';
import {Cpu} from '../../../models/manage-stocks/cpu.model';
import {PortableServices} from '../../../services/portable.services';
import {EntrepotServices} from '../../../services/entrepot.services';
import {ProductServices} from '../../../services/product.services';
import {Router} from '@angular/router';
import {PortableCategory} from '../../../models/manage-stocks/portable-category.model';
import {Product} from '../../../models/manage-stocks/product.model';

@Component({
  selector: 'app-new-phones',
  templateUrl: './new-phones.component.html',
  styleUrls: ['./new-phones.component.scss']
})
export class NewPhonesComponent implements OnInit {
portable: Portable;
product: Product;
listProductCategory: Array<ProductCategory>;
listMeasureUnit: Array<MeasureUnit>;
listState: Array<State>;
listEmplacement: Array<Emplacement>;
listSystemOs: Array<SystemOs>;
listCamera: Array<Camera>;
listMemory: Array<Memory>;
listCpu: Array<Cpu>;
listPortableCategory: Array<PortableCategory>;
mode = 1;
constructor(public portableServices: PortableServices, public entrepotService: EntrepotServices,
            public productServices: ProductServices, public router: Router) {
}
ngOnInit() {
  this.portableServices.listAllcatPorta()
    .subscribe(data => {
      this.listPortableCategory = data.json();
      console.log(this.listPortableCategory);
    },
      err => {
      console.log(err);
      });
  this.productServices.listAllMeasureUnit()
    .subscribe(data => {
      this.listMeasureUnit = data.json();
      console.log(this.listMeasureUnit);
    },
      err => {
      console.log(err);
      });
  this.portableServices.listAllCamera()
      .subscribe(data => {
        this.listCamera = data.json();
        console.log(this.listCamera);
      },
        err => {
        console.log(err);
        });
     this.portableServices.listAllSystemOs()
      .subscribe(data => {
        this.listSystemOs = data.json();
        console.log(this.listSystemOs);
      },
        err => {
        console.log(err);
        });
     this.entrepotService.listEmplOfAllEntr()
      .subscribe(data => {
        this.listEmplacement = data.json();
        console.log(this.listEmplacement);
      },
        err => {
        console.log(err);
        });
      this.productServices.listAllState()
      .subscribe(data => {
        this.listState = data.json();
        console.log(this.listState);
      },
        err => {
        console.log(err);
        });
      this.portableServices.listAllCpu()
      .subscribe(data => {
        this.listCpu = data.json();
        console.log(this.listCpu);
      },
        err => {
        console.log(err);
        });
      this.portableServices.listAllMemory()
      .subscribe(data => {
        this.listMemory = data.json();
        console.log(this.listMemory);
      },
        err => {
        console.log(err);
        });
      this.productServices.listAllCatPrdct()
      .subscribe(data => {
        this.listProductCategory = data.json();
        console.log(this.listProductCategory);
      },
        err => {
        console.log(err);
        });
}
 submitForm() {
    this.mode = 2;
  }
   savePortable() {
     console.log(this.portable);
    this.portableServices.savePortable(this.portable)
      .subscribe(data => {
        this.portable = data.json();
      },
        err => {
        console.log(err);
        });
  }
  cancel() {
    this.mode = 1;
  }
}
