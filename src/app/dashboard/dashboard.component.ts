import { Component, OnInit } from '@angular/core';
import { DashboardItems } from '../shared/menu-items/dashboard-items';
import {AccountsService} from '../accounts/accounts.service';
import {AuthenticationService} from '../authentication/authentication.service';
import {AppMenu} from '../models/appmenu.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  menus: Array<AppMenu> = new Array();
  user = {};

  constructor(private items: DashboardItems,
              private auth: AuthenticationService,
              private accountService: AccountsService) {}

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.accountService.getUser(this.auth.getUserName()).subscribe(resp => {
      this.user = resp;
      this.user['roles'].forEach(role => {
        this.menus = this.menus.concat(role.menus);
      });
    });
  }

}
