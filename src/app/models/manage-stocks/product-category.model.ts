import {Product} from './product.model';
import {GenericCategory} from './category.model';

export interface ProductCategory extends GenericCategory {
 products: Product;
}
