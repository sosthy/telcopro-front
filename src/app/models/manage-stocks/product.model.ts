import {MouvmentLine} from './mouvment-line.model';
import {AppColor} from './app-color.model';
import {ProductCategory} from './product-category.model';
import {MeasureUnit} from './measure-unit.model';
import {Emplacement} from './emplacement.model';
import {State} from './state.model';
import {GenericCategory} from "./category.model";

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
  productCategory: GenericCategory;
  appColor: AppColor;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.connection : null) : null;
    this.quantity = obj ? (obj.quantity ? obj.quantity : 0) : 0;
    this.dateCreation = obj ? (obj.dateCreation ? obj.dateCreation : new Date()) : new Date();
    this.designation = obj ? (obj.designation ? obj.designation : '') : '';
    this.image = obj ? (obj.image ? obj.image : '') : '';
    this.priceUnit = obj ? (obj.priceUnit ? obj.priceUnit : 0) : 0;
    this.priceUnitWholesaler = obj ? (obj.priceUnitWholesaler ? obj.priceUnitWholesaler : 0) : 0;
    this.priceUnitSemiWholesaler = obj ? (obj.priceUnitSemiWholesaler ? obj.priceUnitSemiWholesaler : 0) : 0;
    this.stockMinimum = obj ? (obj.stockMinimum ? obj.stockMinimum : 0) : 0;
    this.stockAlert = obj ? (obj.stockAlert ? obj.stockAlert : 0) : 0;
    this.volume = obj ? (obj.volume ? obj.volume : 0) : 0;
    this.note = obj ? (obj.note ? obj.note : '') : '';
    this.state = obj ? (obj.state ? obj.state : new State()) : new State();
    this.emplacement = obj ? (obj.emplacement ? obj.emplacement : new Emplacement()) : new Emplacement();
    this.measureUnit = obj ? (obj.measureUnit ? obj.measureUnit : new MeasureUnit()) : new MeasureUnit();
    this.productCategory = obj ? (obj.productCategory ? obj.productCategory : new GenericCategory()) : new GenericCategory();
    this.appColor = obj ? (obj.appColor ? obj.appColor : new AppColor()) : new AppColor();
  }
}
