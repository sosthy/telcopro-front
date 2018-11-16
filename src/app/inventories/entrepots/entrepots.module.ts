

import {NgModule} from "@angular/core";
import {EntrepotListComponent} from "./list-entrepots/list-entrepots.component";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {FormsModule} from "@angular/forms";
import {EntrepotRoutes} from "./entrepots.routing";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {EntrepotService} from "./entrepots.services";
import {EntrepotComponent} from "./entrepots.component";
import {EmplacementListComponent} from "./list-emplacements/list-emplacements.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EntrepotRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    EntrepotComponent,
    EntrepotListComponent,
    EmplacementListComponent
  ],
  providers: [
    EntrepotService,
  ]
})
export class EntrepotModule { }
