import {Component, OnInit} from '@angular/core';
import {EmployeeService} from '../../services/employee.services';
import {Employee} from '../../models/employee.model';
import {EntrepotService} from '../../inventories/entrepots/entrepots.services';
import {WorkSpaceService} from '../../services/workSpace.services';
import {PointOfSaleService} from '../../services/pointOfSale.services';
import {WorkSpace} from '../../models/workSpace.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {
  listEmployees = [];
  filter = '';
  keyWords = '';
  pageToLoad = 'listing page'; // listing page, add page, edit page, details page, confirm edit page, confirm add page
  tableMessage = 'Loading.... Please wait!';
  employee = new Employee(null);
  workSpaces = [ ];
  photoFile: File;
  constructor(public employeeService: EmployeeService, public entrepotService: EntrepotService,
              public workSpaceService: WorkSpaceService, public pointOfSaleService: PointOfSaleService) { }
  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees()
      .subscribe(data => {
          this.listEmployees = data.json();
          console.log(this.listEmployees);
          this.tableMessage = 'No employee found';
        },
        err => {
          console.log(err);
        });
    this.getWorkSpaces();
  }
  getWorkSpaces() {
    this.filter = 'All';
    this.workSpaceService.getWorkSpaces()
    .subscribe(data => {
        this.workSpaces = data.json();
        console.log(this.workSpaces);
      },
        err => {
        console.log(err);
        }
        );
  }
  getEntrepots() {
    this.filter = 'Entrepôts';
    this.employee.workSpace = new WorkSpace(null);
    this.entrepotService.listAllEntrepots()
    .subscribe(data => {
        this.workSpaces = data;
        console.log(this.workSpaces);
      },
        err => {
        console.log(err);
        }
        );
  }
  getSalePoints() {
    this.filter = 'Points of sale';
    this.employee.workSpace = new WorkSpace(null);
    this.pointOfSaleService.getPointOfSales()
    .subscribe(data => {
        this.workSpaces = data.json();
        console.log(this.workSpaces);
      },
        err => {
          console.log(err);
        }
      );
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

  loadAddPage() {
    this.employee = new Employee();
    this.pageToLoad = 'add page';
  }

  submitForm() {
    this.pageToLoad = 'confirm ' + this.pageToLoad;
    console.log(this.photoFile);
  }

  loadEditionPage(employee) {
    console.log(employee.workSpace.workSpaceType);
    if (employee.workSpace.workSpaceType.includes('Point')) {
      this.getSalePoints();
    }else if (employee.workSpace.workSpaceType.includes('Entre')) {
      this.getEntrepots();
    } else {
      this.getWorkSpaces();
    }
    this.employee = employee;
    this.pageToLoad = 'edit page';
  }

  deleteEmployeeRequest(employee) {
    const confirm = window.confirm('Employee ' + employee.name + ' ' + employee.surname + ' will be detete.');
    if (confirm === true) {
      this.listEmployees.splice(this.listEmployees.indexOf(employee), 1);
      this.employeeService.deleteEmployee(employee.id)
        .subscribe(data => {
            alert('Employee ' + employee.name + ' ' + employee.surname + ' has been succeful removed');
          },
          err => {
            alert('problem');
          });
    }
  }

  loadDetailPage(employee) {
    this.employee = employee;
    this.pageToLoad = 'details page';
  }

  saveInformation() {
    const page = this.pageToLoad;
    /*
    this.employeeService.saveEmployee(this.employee, this.photoFile)
    .subscribe(data => {
       this.employee = data.json();
     },
       err => {
       console.log(err);
       });
     */
    this.employeeService.saveEmployee(this.employee)
      .subscribe(data => {
          this.employee = data.json();
          if (page === 'confirm add page') {
            this.listEmployees.push(this.employee);
            console.log('Result Save information', this.employee);
          }
        },
        err => {
          console.log(err);
        });
    alert('Employee ' + this.employee.name + ' ' + this.employee.surname + ' has been succeful done.');
    this.pageToLoad = 'listing page';
  }
}
