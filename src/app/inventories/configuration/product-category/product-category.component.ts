
import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {GenericCategory} from "../../../models/manage-stocks/category.model";
import {ProductCategoryService} from "./product-category.service";

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {


  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  categories: Array<GenericCategory> = new Array();
  category: GenericCategory = new GenericCategory();
  modalRef: NgbModalRef;

  constructor(private modalService: NgbModal, private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.mode = 1;
    this.addEditCardHeader = 'Create Role';
    this.init();
  }

  async init() {
    this.category = new GenericCategory();
    this.categories = await this.productCategoryService.getAllProductCategory().toPromise();
  }

  open(content, cat?: GenericCategory) {
    this.category = cat ? new GenericCategory(cat) : new GenericCategory();

    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.init();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  onCreateUser(): void {
    this.addEditCardHeader = 'Create Category';
    this.mode = 4;
  }

  onListUser(): void {
    this.mode = 1;
  }

  onDetailsUser(id: number): void {
    console.log(id);
    this.mode = 2;
  }

  async onSaveProductCategory() {
    const data = await this.productCategoryService.saveProductCategory(this.category).toPromise();
    if (this.category.id) {
      const index: number = this.categories.indexOf(this.category);
      if (index !== -1) {
        this.categories[index] = data;
      }
    }
    this.init();
    this.modalRef.close();
  }

  onDeleteProductCategory() {
    this.productCategoryService.deleteProductCategory(this.category.id).subscribe(data => {
      this.categories.forEach(c => {
        if (c.name === data.name) {
          const index: number = this.categories.indexOf(c);
          if (index !== -1) {
            this.categories.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

