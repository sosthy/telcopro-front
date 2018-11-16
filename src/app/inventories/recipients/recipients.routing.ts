import { Routes } from '@angular/router';
import {RecipientsComponent} from './recipients.component';


export const RecipientsRoutes: Routes = [{
  path: '',
  component: RecipientsComponent,
  data: {
    heading: 'Fournisseurs/Clients'
  }
}];
