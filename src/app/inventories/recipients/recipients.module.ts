import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {RecipientsComponent} from './recipients.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RecipientsRoutes} from './recipients.routing';
import {RecipientsService} from './recipients.service';
import {MouvmentServices} from '../../services/mouvment.services';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(RecipientsRoutes),
    FormsModule,
    NgbModule,
    ReactiveFormsModule],
  declarations: [RecipientsComponent],
  providers: [RecipientsService, MouvmentServices]
})

export class RecipientsModule {}
