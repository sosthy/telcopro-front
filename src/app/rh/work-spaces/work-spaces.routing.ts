import { Routes } from '@angular/router';
import {WorkSpacesComponent} from './work-spaces.component';


export const WorkSpacesRoutes: Routes = [{
  path: '',
  component: WorkSpacesComponent,
  data: {
    heading: 'Work Spaces'
  }
}];
