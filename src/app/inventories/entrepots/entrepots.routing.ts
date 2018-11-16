

import {Routes} from "@angular/router";
import {EntrepotComponent} from "./entrepots.component";
import {EntrepotListComponent} from "./list-entrepots/list-entrepots.component";
import {Emplacement} from "../../models/manage-stocks/emplacement.model";
import {EmplacementListComponent} from "./list-emplacements/list-emplacements.component";


export const EntrepotRoutes: Routes = [
  {
    path: '',
    component: EntrepotListComponent,
  },
  {
    path: ':id/emplacements',
    component: EmplacementListComponent,
  }
]
