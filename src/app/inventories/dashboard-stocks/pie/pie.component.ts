import {Component, OnInit} from '@angular/core';

import { colorSets } from '@swimlane/ngx-charts/release/utils/color-sets';
import { single } from '../../../shared/chartData';
import {PortableServices} from '../../../services/portable.services';
import {Portable} from '../../../models/manage-stocks/portable.model';
import {Router} from '@angular/router';
import {EntrepotServices} from '../../../services/entrepot.services';
import {GenericEntrepot} from '../../../models/manage-stocks/entrepot.model';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  single = new Array();
  entrepotDescription = new Array();
  // options
  gradient = false;
  tooltipDisabled = false;

  colorScheme = {
    domain: [
      '#0099CC', '#E596E6', '#2ECC71', '#4CC3D9', '#FFC65D', '#D96557', '#BA68C8'
    ]
  };
  portables = new Array<Portable>();
  entrepots = new Array<GenericEntrepot>();
  constructor(private  portableServices: PortableServices,
              private  entrepotServices: EntrepotServices,
              private router: Router) {
  }
  ngOnInit () {
    this.initServices();
  }
  initServices() {
    this.portableServices.listAllPortable()
      .subscribe(data => {
          this.portables = data.json();
          this.initPortableDashBoard();
        },
        err => {
          console.log(err);
        }
      );
    this.entrepotServices.listEntrepot()
      .subscribe(data => {
          this.entrepots = data.json();
          this.initEntrepotDashBoard();
        },
        err => {
          console.log(err);
        }
      );
  }
  dashboardConform (dashboardItem: Array<any>) {
    if (dashboardItem.length === 0) {
      return false;
    } else {
      for (let i = 0; i < dashboardItem.length; i++) {
        if (dashboardItem[i].value > 0) {
          return true;
        }
      }
      return false;
    }
  }
  generateUniqueColor(colors) {
    const length = 6, charset = 'ABCDEF0123456789';
    let retVal;
    do {
      retVal = '#';
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
    } while (colors.indexOf(retVal) !== -1);
    return retVal;
  }
  initPortableDashBoard() {
    const test = [];
    for (let i = 0; i < this.portables.length; i++) {
        test.push({name: this.portables[i].designation, value: this.portables[i].quantity });
        if ( i > this.colorScheme.domain.length - 1) {
          this.colorScheme.domain.push(this.generateUniqueColor(this.colorScheme.domain));
        }
      }
      this.single = test;
  }
  select(data) {
    console.log(data);
    this.router.navigate(['inventories/products/phones',
      this.portables[this.portables.findIndex((value) => value.designation === data.name)].id]);
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }
  initEntrepotDashBoard() {
    const test = [];
    for (let i = 0; i < this.entrepots.length; i++) {
        test.push({name: this.entrepots[i].name, value: this.entrepots[i].nbOfProduct });
        if ( i > this.colorScheme.domain.length - 1) {
          this.colorScheme.domain.push(this.generateUniqueColor(this.colorScheme.domain));
        }
      }
      this.entrepotDescription = test;
  }
  selectEntrepot(data) {
    this.router.navigate(['inventories/entrepots']);
  }

  onLegendLabelEntrepotClick(entry) {
    console.log('Legend Entrepot clicked', entry);
  }

}
