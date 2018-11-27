import {Component, OnInit} from '@angular/core';
import {PortableServices} from '../../../services/portable.services';
import {Http} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Portable} from '../../../models/manage-stocks/portable.model';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})

export class PhonesComponent implements OnInit {
  listPortables: any;
  tableMessage = 'Loading.... Please wait!';
  motcle: string;
  portable: Portable;
  mode = 1;
  constructor(public http: Http,
              public portableservices: PortableServices,
              public router: Router) {
  }
  ngOnInit() {
    this.showPhones();
  }
  showPhones() {
    this.portableservices.listAllPortable()
      .subscribe(data => {
        this.listPortables = data.json();
      },
        err => {
        console.log(err);
        }
        );
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
  onDeletePhone(p: Portable) {
    console.log(p);
    const confirm = window.confirm('Are you sure?');
    if (confirm === true) {
          this.listPortables.splice(
            this.listPortables.indexOf(p), 1
          );
      this.portableservices.deletePortable(p.id)
        .subscribe(data => {
          alert('successful removal');
        },
          err => {
          alert('problem');
          });
    }
  }
  onEditPortable(p: Portable) {
    this.router.navigate(['inventories/products/edit-phones', p]);
  }
  onDetailsPhone(phone) {
    this.mode = 2;
    this.portable = phone;
  }
}
