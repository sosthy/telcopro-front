import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.services';
import {Employee} from '../../models/employee.model';
import {EntrepotService} from '../../inventories/entrepots/entrepots.services';
import {WorkSpaceService} from '../../services/workSpace.services';
import {PointOfSaleService} from '../../services/pointOfSale.services';
import {WorkSpace} from '../../models/workSpace.model';
import {ModalDismissReasons, NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {
  listEmployees = [];
  filter = '';
  keyWords = '';
  tableMessage = 'Loading.... Please wait!';
  employee = new Employee(null);
  workSpaces = [ ];
  workSpacesView = [ ];
  photoFile: File;
  closeResult: string;
  modalRef: NgbModalRef;
  modalTitle = 'New Employee';
  employeeFile: any = File;
  constructor(private modalService: NgbModal,
              public employeeService: EmployeeService,
              public workSpaceService: WorkSpaceService) { }

  ngOnInit() {
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
      },
        err => {
        console.log(err);
        }
        );
  }
  getWorkSpaces() {
    this.filter = 'All';
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
  fileInputChange(event) {
    this.photoFile = event.target.files[0];
    console.log(this.photoFile);
  }
  open(content, employee?: Employee, mode?: number) {
    this.employee = employee ? employee : new Employee();
    if (employee) {
      if (mode === 1) {
        this.modalTitle = 'Edit Employee';
      } else if (mode === 2) {
        this.modalTitle = 'Delete Employee';
      }  else if (mode === 3) {
        this.modalTitle = 'Detail Employee';
      } else {
        this.modalTitle = 'Confirm registration employee';
      }
    } else {
      this.modalTitle = 'New Employee';
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
        }
      },
      err => {
        console.log(err);
      });
  }
}
