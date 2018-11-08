import {Component, OnInit} from '@angular/core';
import {PortableServices} from '../../../services/portable.services';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})

export class PhonesComponent implements OnInit {
  listPortables: any;
  constructor(public http: Http, public portableservices: PortableServices, public router: Router) {
  }
  ngOnInit() {
    this.showPhones();
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
}
