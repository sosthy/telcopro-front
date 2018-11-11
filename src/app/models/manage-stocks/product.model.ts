import {MouvmentLine} from './mouvment-line.model';
import {AppColor} from './app-color.model';
import {ProductCategory} from './product-category.model';
import {MeasureUnit} from './measure-unit.model';
import {Emplacement} from './emplacement.model';
import {State} from './state.model';

export class Product {
  id: number;
  quantity: number;
  dateCreation: Date;
  designation: string;
  image: string;
  priceUnit: number;
  priceUnitWholesaler: number;
  priceUnitSemiWholesaler: number;
  stockMinimum: number;
  stockAlert: number;
  volume: number;
  note: string;
  state: State;
  emplacement: Emplacement;
  measureUnit: MeasureUnit;
  productCategory: ProductCategory;
  appColor: AppColor;
  mouvementLines: MouvmentLine;

  constructor() {

  }
}
