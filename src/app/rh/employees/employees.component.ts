import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.services';
import {Employee} from '../../models/employee.model';
import {WorkSpaceService} from '../../services/workSpace.services';
import {WorkSpace} from '../../models/workSpace.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ResourceService} from '../../services/resource.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAX_LENGHT_CARD_TEXT} from '../../models/config.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {
  listEmployees = Array<Employee>();
  filter = 'None';
  keyWords = '';
  tableMessage = 'Loading.... Please wait!';
  employee = new Employee(null);
  workSpaces = [ ];
  workSpacesView = [ ];
  closeResult: string;
  modalRef: NgbModalRef;
  modalTitle = 'New Employee';
  employeeFile: any = File;
  image = [];
  imageName = [];
  form: FormGroup;
  MAX_LENGHT_CARD_TEXT = MAX_LENGHT_CARD_TEXT;
  constructor(private fb: FormBuilder,
              private modalService: NgbModal,
              public employeeService: EmployeeService,
              public resourceService: ResourceService,
              public workSpaceService: WorkSpaceService) { }

  ngOnInit() {
    this.getImages();
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees()
      .subscribe(data => {
          this.listEmployees = data.json();
          this.tableMessage = 'No employee found';
        },
        err => {
          console.log(err);
        });
    this.workSpaceService.getWorkSpaces()
    .subscribe(data => {
        this.workSpaces = data.json();
        this.getWorkSpaces();
      },
        err => {
        console.log(err);
        }
        );
  }
  getWorkSpaces() {
    this.filter = 'None';
    this.workSpacesView = this.workSpaces;
  }
  getEntrepots() {
    this.filter = 'Entrepôts';
    this.workSpacesView = this.workSpaces.filter(spacer => spacer.workSpaceType.includes('Entrepot'));
  }
  getSalePoints() {
    this.filter = 'Points of sale';
    this.workSpacesView = this.workSpaces.filter(spacer => spacer.workSpaceType.includes('Point'));
  }

  search() {
    this.employeeService.search(this.keyWords)
      .subscribe(data => {
          this.listEmployees = data.json();
          this.tableMessage = 'No results matching';
        },
        err => {
          console.log(err);
        }
      );
  }

  deleteEmployee() {
    this.listEmployees.splice(this.listEmployees.indexOf(this.employee), 1);
    this.employeeService.deleteEmployee(this.employee.id)
      .subscribe(data => {
        },
        err => {
          alert('problem');
        });
  }
   open(content, employee?: Employee, mode?: number) {
    this.employee = employee ? employee : new Employee();
    if (employee) {
      if (mode === 1) {
        this.modalTitle = 'Edit Employee';
        this.initForm();
      } else if (mode === 2) {
        this.modalTitle = 'Delete Employee';
      }  else if (mode === 3) {
        this.modalTitle = 'Detail Employee';
      }  else if (mode === 4) {
        this.modalTitle = 'Confirm registration Employee';
      } else {
        this.modalTitle = 'New Employee';
      }
    } else {
      this.modalTitle = 'New Employee';
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
      this.modalTitle = 'Edit Employee';
      this.open(content, this.employee, 1);
    } else {
      this.modalTitle = 'New Employee';
      this.open(content, this.employee);
    }
  }
  onselectFile(event) {
    const file = <File>event.target.files[0];
     console.log(file);
    this.employeeFile = file;
  }
  async saveInformation() {
    console.log(this.employeeFile);
    this.employee.workSpace = new WorkSpace(this.employee.workSpace);
    console.log(this.employee);
    const formData = new FormData();
    formData.append('employee', JSON.stringify(this.employee));
    formData.append('file', this.employeeFile);
    const index = this.listEmployees.indexOf(this.employee);
    this.employeeService.saveUserProfile(formData).subscribe(data => {
      this.employee = data.json();
        if (index === -1) {
          this.listEmployees.push(this.employee);
          this.resourceService.download(this.employee.photo).subscribe(res => {
            this.image.push(res['_body'].substr(res['_body'].indexOf('$') + 1));
            this.imageName.push(res['_body'].substr(0, res['_body'].indexOf('$')));
          });
        }
      },
      err => {
        console.log(err);
      });
    this.getImages();
    this.modalRef.close();
  }
  getImages() {
    this.image = [];
    this.imageName = [];
    this.resourceService.downloads('DIRECTORY_EMPLOYEES_IMAGES')
      .subscribe(res => {
        let indiceDelimiteur = 0;
        res.json().forEach(data => {
          indiceDelimiteur = data.indexOf('$');
          if (indiceDelimiteur !== -1) {
            this.imageName.push(data.substr(0, indiceDelimiteur));
            this.image.push(data.substr(indiceDelimiteur + 1));
          }
        });
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
  }
  initForm() {
    if (!this.form) {
      this.form = this.fb.group({
        'name': [null, Validators.required],
        'surname': [null, Validators.compose([Validators.required])],
        'cni': [null, Validators.compose([Validators.required])],
        'birthday': [null, Validators.compose([Validators.required])],
        'website': [null, Validators.compose([Validators.required])],
        'phone': [null, Validators.compose([Validators.required])],
        'hiringDate': [null, Validators.compose([Validators.required])]
      });
    }
    if (this.modalTitle === 'Edit Employee') {
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
