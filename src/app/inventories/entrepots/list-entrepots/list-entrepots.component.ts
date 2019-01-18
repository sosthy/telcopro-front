import {Component, OnInit} from '@angular/core';
import {GenericEntrepot} from '../../../models/manage-stocks/entrepot.model';
import {EntrepotService} from '../entrepots.services';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAX_LENGHT_CARD_TEXT} from '../../../models/config.model';


@Component({
  selector: 'app-list-entrepot',
  templateUrl: './list-entrepots.component.html',
  styleUrls: ['./list-entrepots.component.scss']
})
export class EntrepotListComponent implements OnInit {

  listEntrepot: Array<GenericEntrepot> = [];
  tableMessage = 'Loading.... Please wait!';
  entrepot: GenericEntrepot = new GenericEntrepot();
  addEditCardHeader = 'Add Entrepot';
  closeResult: string;
  modalRef: NgbModalRef;
  motcle = '';
  form: FormGroup;
  MAX_LENGHT_CARD_TEXT = MAX_LENGHT_CARD_TEXT;
  constructor(private fb: FormBuilder,
              private entrepotService: EntrepotService,
              private modalService: NgbModal,
              private router: Router) { }

  ngOnInit() {
    this.addEditCardHeader = 'Create Entrepot';
    this.init();
  }

  async init() {
    this.entrepot = new GenericEntrepot();
    this.listEntrepot = await this.entrepotService.listAllEntrepots().toPromise();
  }

  viewEmplacements(entrepot: GenericEntrepot) {
    this.router.navigate(['inventories/entrepots/' + entrepot.id + '/emplacements', entrepot]);
  }

  open(content, entrepot?: GenericEntrepot) {
    this.entrepot = entrepot ? new GenericEntrepot(entrepot) : new GenericEntrepot();
    if (this.entrepot.id) {
      this.addEditCardHeader = 'Edit Entrepot';
    } else  {
      this.addEditCardHeader = 'Add Entrepot';
    }
    this.initForm();
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

  async onSaveEntrepot() {
    const data = await this.entrepotService.saveEntrepot(this.entrepot).toPromise();
    if (this.entrepot.id) {
      const index: number = this.listEntrepot.indexOf(this.entrepot);
      if (index !== -1) {
        this.listEntrepot[index] = data.json();
      }
    }
    this.init();
    this.modalRef.close();
  }

  onDeleteEntrepot() {
    this.entrepotService.deleteEntrepot(this.entrepot.id).subscribe(data => {
      this.listEntrepot.forEach(e => {
        if (e.name === data['name']) {
          const index: number = this.listEntrepot.indexOf(e);
          if (index !== -1) {
            this.listEntrepot.splice(index, 1);
          }
        }
      });
      this.init();
    });

    this.modalRef.close();
  }
  search() {
    this.entrepotService.search(this.motcle)
      .subscribe(data => {
        this.listEntrepot = data.json();
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        }
        );
  }
  initForm() {
    if (!this.form || this.addEditCardHeader === 'Add Entrepot') {
      this.form = this.fb.group({
        'entrepotName': [null, Validators.required],
        'location': [null, Validators.required],
        'volsecur': [null, Validators.compose([Validators.required, Validators.min(1)])]
      });
    }
    if (this.addEditCardHeader === 'Edit Entrepot') {
      for (const i in this.form.controls) {
        this.form.controls[i].markAsTouched();
      }
    }
  }
  arrangeClass(nameInput) {
    return  this.isUnValid(nameInput) ? 'is-invalid' : (this.form.controls[nameInput].touched ? 'is-valid' : '');
  }
  isUnValid(nameInput) {
    return !this.form.controls[nameInput].valid && this.form.controls[nameInput].touched;
  }
}
