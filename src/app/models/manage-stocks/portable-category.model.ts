import {GenericCategory} from './category.model';
import {Portable} from './portable.model';

export interface PortableCategory extends GenericCategory {
  portables: Portable;
}
