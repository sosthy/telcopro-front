

import {Component, OnInit} from '@angular/core';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {PortableItem} from '../../../models/manage-stocks/portable-item.model';
import {ActivatedRoute} from '@angular/router';
import {PortableItemServices} from './items.services';
import {PortableServices} from '../../../services/portable.services';
import {EntrepotService} from '../../entrepots/entrepots.services';
import {Portable} from '../../../models/manage-stocks/portable.model';
import {FormController} from '../../../services/form-controller.services';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class PortableItemComponent extends FormController implements OnInit {
  public data: any[];
  closeResult: string;
  mode: number;
  addEditCardHeader: string;
  items: Array<PortableItem> = new Array();
  tableMessage = 'Loading.... Please wait!';
  item: PortableItem = new PortableItem();
  modalRef: NgbModalRef;
  motCle: string;
  message = '';
  constructor(private modalService: NgbModal, private portableService: PortableServices,
              private portableItemService: PortableItemServices,
              private entrepotService: EntrepotService,
              public route: ActivatedRoute) { super(); }
  ngOnInit() {
    const idPortable = this.route.snapshot.params['id'];
    this.portableService.listPortable(idPortable)
      .subscribe(p => {
        const phone = new Portable(p.json());
        this.item.portable = phone;
        this.portableItemService.getPortableItems(idPortable).subscribe(data => {
            this.items = data.json();
            this.items.forEach( item => {
              item.portable = phone;
            });
            console.log(this.items);
            this.tableMessage = 'No item found';
         },
           err => {
           console.log(err);
           });
     },
       err => {
       console.log(err);
       });
    this.addEditCardHeader = 'Add Item';
  }
  // ---------------------------------------- -----------------------------------------------------------------------------------
  open(content, item?: PortableItem) {
    this.item = item ? new PortableItem(item) : new PortableItem();
    if (item) {
      this.message = '';
      this.initForm();
      this.addEditCardHeader = 'Edit Item';
    } else {
      this.addEditCardHeader = 'Add Item';
      this.entrepotService.addPossible(this.item.portable.emplacement.entrepot.id , this.item.portable)
      .subscribe(rep => {
        if (rep.json()) {
          this.message = '';
        } else {
          this.message = 'Can not add item of ' + this.item.portable.designation + '! ';
          this.message = this.message + 'Capacity entrepot ' + this.item.portable.emplacement.entrepot.name + ': ';
          this.message = this.message  + this.item.portable.emplacement.entrepot.volume + '/'  +
            this.item.portable.emplacement.entrepot.volumeSecurity;
          this.message = this.message + '. Volume product ' + this.item.portable.designation + ': ';
          this.message = this.message  + this.item.portable.volume;
        }
     },
       err => {
       console.log(err);
       });
    }
    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  // ------------------------------------------- -------------------------------------------------------------------------------
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  // --------------------------------------- -----------------------------------------------------------------------------------
   onSaveItem() {
    this.portableItemService.savePortableItem(this.item).subscribe(data => {
      if (this.item.id) {
        this.items[
            this.items.findIndex((item) => item.id === this.item.id)
          ] = data.json();
      } else {
        this.items.push(data.json());
        this.item.portable.emplacement.entrepot.volume = this.item.portable.emplacement.entrepot.volume + this.item.portable.volume;
        this.item.portable.quantity = this.item.portable.quantity + 1;
        this.portableService.savePortable(this.item.portable).subscribe(d => {});
        this.entrepotService.saveEntrepot(this.item.portable.emplacement.entrepot).subscribe(d => {});
      }
    });
    this.modalRef.close();
  }
  // -------------------------------------------- ----------------------------------------------------------------------------
  onDeleteItem() {
    this.portableItemService.deletePortableItem(this.item.id).subscribe(data => {
      if (data.json()) {
        this.items.splice(this.items.indexOf(this.item), 1);
        this.item.portable.emplacement.entrepot.volume = this.item.portable.emplacement.entrepot.volume - this.item.portable.volume;
        this.item.portable.quantity = this.item.portable.quantity - 1;
        this.portableService.savePortable(this.item.portable).subscribe(d => {});
        this.entrepotService.saveEntrepot(this.item.portable.emplacement.entrepot).subscribe(d => {});
        this.tableMessage = 'No item found';
      }
    });

    this.modalRef.close();
  }
  searchItem() {
     this.portableItemService.searchPortableItem(this.item.portable.id, this.motCle)
       .subscribe(data => {
         this.items = data.json();
         this.items.forEach( item => {
              item.portable = this.item.portable;
            });
          this.tableMessage = 'No results matching';
       },
         err => {
         console.log(err);
         });
  }
  initForm() {
    if (!super.formInit()) {
      super.defaultForm('serialItem', 'codeQrcItem', 'codeBarItem');
    } else if (!this.item.id) {
      super.resetForm();
    }
    if (this.item.id) {
      super.markFormControlsAsTouched();
    }
  }
}
