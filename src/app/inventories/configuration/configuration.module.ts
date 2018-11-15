

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ConfigurationRoutes} from './configuration.routing';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CameraComponent} from './camera/camera.component';
import {ColorComponent} from './color/color.component';
import {MeasureComponent} from './measure/measure.component';
import {MemoryComponent} from './memory/memory.component';
import {PhoneCategoryComponent} from './phone-category/phone-category.component';
import {ProductCategoryComponent} from './product-category/product-category.component';
import {ProcessorComponent} from './processor/processor.component';
import {StateComponent} from './state/state.component';
import {SystemosComponent} from './systemos/systemos.component';
import {ConfigurationComponent} from './configuration.component';
import {PhoneCategoryService} from './phone-category/phone-category.service';
import {ProductCategoryService} from './product-category/product-category.service';
import {CameraService} from './camera/camera.service';
import {MeasureService} from './measure/measure.service';
import {MemoryService} from './memory/memory.service';
import {ProductServices} from '../../services/product.services';
import {StateService} from './state/state.service';
import {SystemosService} from './systemos/systemos.service';
import {ColorService} from './color/color.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ConfigurationRoutes),
    FormsModule,
    NgbModule
  ],
  declarations: [
    ConfigurationComponent,
    CameraComponent,
    ColorComponent,
    MeasureComponent,
    MemoryComponent,
    PhoneCategoryComponent,
    ProductCategoryComponent,
    ProcessorComponent,
    StateComponent,
    SystemosComponent,
  ],
  providers: [PhoneCategoryService, ProductCategoryService, CameraService, MeasureService, MemoryService, ProductServices,
  StateService, SystemosService, ColorService]
})
export class ConfigurationModule {}
