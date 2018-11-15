import {Component, OnInit} from '@angular/core';
import {Portable} from '../../../models/manage-stocks/portable.model';
import {ProductCategory} from '../../../models/manage-stocks/product-category.model';
import {MeasureUnit} from '../../../models/manage-stocks/measure-unit.model';
import {State} from '../../../models/manage-stocks/state.model';
import {Emplacement} from '../../../models/manage-stocks/emplacement.model';
import {Systemos} from '../../../models/manage-stocks/system-os.model';
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
  portable: Portable = new Portable();
  listMeasureUnit: Array<MeasureUnit>;
  listState: Array<State>;
  listEmplacement: Array<Emplacement>;
  listSystemOs: Array<Systemos>;
  listCamera: Array<Camera>;
  listMemory: Array<Memory>;
  listCpu: Array<Cpu>;
  listPortableCategory: Array<PortableCategory>;
  mode = 1;


constructor(public portableServices: PortableServices, public router: Router) {}


ngOnInit() {
  this.portableServices.listAllcatPorta()
    .subscribe(data => {
      this.listPortableCategory = data.json();
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
}
 submitForm() {
    this.mode = 2;
  }
   savePortable() {
     console.log(this.portable);
  }
  cancel() {
    this.mode = 1;
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}
