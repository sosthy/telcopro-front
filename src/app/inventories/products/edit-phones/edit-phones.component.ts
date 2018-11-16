import {Component, OnInit} from '@angular/core';
import {PortableServices} from '../../../services/portable.services';
import {ProductServices} from '../products.services';
import {ActivatedRoute, Router} from '@angular/router';
import {EntrepotServices} from '../../../services/entrepot.services';
import {Cpu} from '../../../models/manage-stocks/cpu.model';
import {Memory} from '../../../models/manage-stocks/memory.model';
import {Camera} from '../../../models/manage-stocks/camera.model';
import {Systemos} from '../../../models/manage-stocks/system-os.model';
import {Emplacement} from '../../../models/manage-stocks/emplacement.model';
import {State} from '../../../models/manage-stocks/state.model';
import {MeasureUnit} from '../../../models/manage-stocks/measure-unit.model';
import {Portable} from '../../../models/manage-stocks/portable.model';
import {GenericCategory} from "../../../models/manage-stocks/category.model";

@Component({
  selector: 'app-edit-phones',
  templateUrl: './edit-phones.component.html',
  styleUrls: ['./edit-phones.component.scss']
})

export class EditPhonesComponent implements OnInit {

portable: Portable;
  listProductCategory: Array<GenericCategory>;
  listMeasureUnit: Array<MeasureUnit>;
  listState: Array<State>;
  listEmplacement: Array<Emplacement>;
  listSystemos: Array<Systemos>;
  listCamera: Array<Camera>;
  listMemory: Array<Memory>;
  listPortableCategory: Array<GenericCategory>;
  listCpu: Array<Cpu>;
  mode = 1;
  constructor(public portableServices: PortableServices, public entrepotService: EntrepotServices,
              public productServices: ProductServices, public router: Router,
              public activatedRoute: ActivatedRoute) {
   // this.portable = activatedRoute.snapshot.params['p'];

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
        }
        );
    this.portableServices.listAllCamera()
      .subscribe(data => {
        this.listCamera = data.json();
        console.log(this.listCamera);
      },
        err => {
        console.log(err);
        }
        );
     this.portableServices.listAllSystemos().subscribe(data => {
        this.listSystemos = data.json();
        console.log(this.listSystemos);
      },
        err => {
        console.log(err);
        }
        );
     this.entrepotService.listEmplOfAllEntr()
      .subscribe(data => {
        this.listEmplacement = data.json();
        console.log(this.listEmplacement);
      },
        err => {
        console.log(err);
        }
        );
      this.productServices.listAllState()
      .subscribe(data => {
        this.listState = data.json();
        console.log(this.listState);
      },
        err => {
        console.log(err);
        }
        );
      this.portableServices.listAllCpu()
      .subscribe(data => {
        this.listCpu = data.json();
        console.log(this.listCpu);
      },
        err => {
        console.log(err);
        }
        );
      this.portableServices.listAllMemory()
      .subscribe(data => {
        this.listMemory = data.json();
        console.log(this.listMemory);
      },
        err => {
        console.log(err);
        }
        );
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
   updatePortable() {
     console.log(this.portable);
    this.portableServices.updatePortable(this.portable)
      .subscribe(data => {
        this.portable = data.json();
        alert('effective update');
        this.router.navigate(['/inventories/products/phones']);
      },
        err => {
        console.log(err);
        alert('problem');
        });
  }
  cancel() {
    this.mode = 1;
  }

}
