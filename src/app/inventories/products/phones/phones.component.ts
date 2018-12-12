import {Component, OnInit} from '@angular/core';
import {PortableServices} from '../../../services/portable.services';
import {Http} from '@angular/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Portable} from '../../../models/manage-stocks/portable.model';
import {ProductServices} from '../products.services';

@Component({
  selector: 'app-phones',
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.scss']
})

export class PhonesComponent implements OnInit {
  listPortables = new Array<Portable>();
  tableMessage = 'Loading.... Please wait!';
  motcle: string;
  portable: Portable;
  mode = 1;
  public image: any = [];
  public imageName: any = [];
  constructor(public http: Http,
              public portableservices: PortableServices,
              public productServices: ProductServices,
              public router: Router) {
  }
  ngOnInit() {
    this.showPhones();
    this.getImages();
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
  routeToItem(p: Portable) {
    this.router.navigate(['inventories/products/phones', p.id]);
  }
}
