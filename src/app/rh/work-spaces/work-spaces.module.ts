import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {WorkSpacesComponent} from './work-spaces.component';
import {WorkSpacesRoutes} from './work-spaces.routing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(WorkSpacesRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule],
  declarations: [WorkSpacesComponent]
})

export class WorkSpacesModule {}
