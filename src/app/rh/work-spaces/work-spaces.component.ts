import {Component, OnInit} from '@angular/core';
import {WorkSpaceService} from '../../services/workSpace.services';
import {WorkSpace} from '../../models/workSpace.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAX_LENGHT_CARD_TEXT} from '../../models/config.model';

@Component({
  selector: 'app-work-spaces',
  templateUrl: './work-spaces.component.html',
  styleUrls: ['./work-spaces.component.scss']
})

export class WorkSpacesComponent implements OnInit {
  listWorkSpaces = [];
  keyWords = '';
  pageToLoad = 'listing page'; // listing page, add page, edit page, details page, confirm edit page, confirm add page
  tableMessage = 'Loading.... Please wait!';
  workSpace: any;
  closeResult: string;
  modalRef: NgbModalRef;
  modalTitle = 'New Work Space';
  form: FormGroup;
  MAX_LENGHT_CARD_TEXT = MAX_LENGHT_CARD_TEXT;
  constructor(private fb: FormBuilder, private modalService: NgbModal, public workSpaceService: WorkSpaceService) { }
  ngOnInit() {
    this.loadWorkSpaces();
  }
  loadWorkSpaces() {
    this.workSpaceService.getWorkSpaces()
      .subscribe(data => {
        this.listWorkSpaces = data.json();
        this.tableMessage = 'No workSpace found';
      },
        err => {
        console.log(err);
        }
        );
  }
  search() {
    this.workSpaceService.search(this.keyWords)
      .subscribe(data => {
        this.listWorkSpaces = data.json();
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        }
        );
  }
  deleteWorkSpace() {
    this.listWorkSpaces.splice( this.listWorkSpaces.indexOf(this.workSpace), 1);
    this.workSpaceService.deleteWorkSpace(this.workSpace.id)
      .subscribe(data => {
      },
        err => {
        alert('problem');
        });
  }
  saveInformation() {
    const index = this.listWorkSpaces.indexOf(this.workSpace);
    this.workSpaceService.saveWorkSpace(this.workSpace)
      .subscribe(data => {
        this.workSpace = data.json();
        if (index === -1) {
          this.workSpace.workSpaceType = 'Work Space';
          this.listWorkSpaces.push(this.workSpace);
        }
      },
      err => {
        console.log(err);
      });
  }
  open(content, workSpace?: WorkSpace, mode?: number) {
    this.workSpace = workSpace ? workSpace : new WorkSpace();
    if (workSpace) {
      if (mode === 1) {
        this.modalTitle = 'Edit Work Space';
        this.initForm();
      } else if (mode === 2) {
        this.modalTitle = 'Delete Work Space';
      }  else if (mode === 3) {
        this.modalTitle = 'Detail Work Space';
      }  else if (mode === 4) {
        this.modalTitle = 'Confirm registration work space';
      } else {
        this.modalTitle = 'New Work Space';
      }
    } else {
      this.modalTitle = 'New Work Space';
      this.initForm();
    }
    this.modalRef = this.modalService.open(content, {backdrop: 'static'});
    this.modalRef.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
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
  preview(content) {
    if (this.modalTitle.includes('Edit')) {
      this.modalTitle = 'Edit Work Space';
      this.open(content, this.workSpace, 1);
    } else {
      this.modalTitle = 'New Work Space';
      this.open(content, this.workSpace, 10);
    }
  }
  initForm() {
    if (!this.form || this.modalTitle === 'Add Work Space') {
      this.form = this.fb.group({
        'name': [null, Validators.required],
        'localisation': [null, Validators.compose([Validators.required])]
      });
    }
    if (this.modalTitle === 'Edit Work Space') {
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
