import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "../../services/employee.services";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {
  listEmployees = [];
  constructor(public employeeService: EmployeeService) { }
  ngOnInit() {
        console.log('Starting nginit');
    this.employeeService.getAllEmployees()
      .subscribe(data => {
        this.listEmployees = data.json();
        console.log(this.listEmployees);
      },
        err => {
        console.log(err);
        }
        );
  }
}
