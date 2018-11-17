

import {ConfigurationComponent} from './configuration.component';
import {PhoneCategoryComponent} from './phone-category/phone-category.component';
import {ProductCategoryComponent} from './product-category/product-category.component';
import {ProcessorComponent} from './processor/processor.component';
import {CameraComponent} from './camera/camera.component';
import {MemoryComponent} from './memory/memory.component';
import {MeasureComponent} from './measure/measure.component';
import {ColorComponent} from './color/color.component';
import {StateComponent} from './state/state.component';
import {SystemosComponent} from './systemos/systemos.component';
import {Routes} from '@angular/router';
import {RecipientsGroupeComponent} from './recipients-groupe/recipients-groupe.component';


export const ConfigurationRoutes: Routes = [{
  path: 'configuration',
  component: ConfigurationComponent,
  children: [
    {
      path: 'phones-category',
      component: PhoneCategoryComponent,
      data: {
        heading: 'Phones Category'
      }
    }, {
      path: 'products-category',
      component: ProductCategoryComponent,
      data: {
        heading: 'Products Category'
      }
    }, {
      path: 'processors',
      component: ProcessorComponent,
      data: {
        heading: 'Processors'
      }
    }, {
      path: 'cameras',
      component: CameraComponent,
      data: {
        heading: 'Camera'
      }
    }, {
      path: 'memory',
      component: MemoryComponent,
      data: {
        heading: 'Memory'
      }
    }, {
      path: 'measures',
      component: MeasureComponent,
      data: {
        heading: 'Measures Unit'
      }
    }, {
      path: 'colors',
      component: ColorComponent,
      data: {
        heading: 'Colors'
      }
    }, {
      path: 'states',
      component: StateComponent,
      data: {
        heading: 'States'
      }
    }, {
      path: 'systemos',
      component: SystemosComponent,
      data: {
        heading: 'System OS'
      }}, {
      path: 'recipientsgroupe',
      component: RecipientsGroupeComponent,
      data: {
        heading: 'Recipients'
      }
    }
  ]
}];
