import {AppColor} from './app-color.model';
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
  stockMinim: number;
  stockAlert: number;
  volume: number;
  note: string;
  state: State;
  emplacement: Emplacement;
  measureUnit: MeasureUnit;
  productCategory: GenericCategory;
  appColor: AppColor;

  constructor(obj?: any) {
    this.id = obj ? (obj.id ? obj.id : null) : null;
    this.quantity = obj ? (obj.quantity ? obj.quantity : 0) : 0;
    this.dateCreation = obj ? (obj.dateCreation ? obj.dateCreation : null) : null;
    this.designation = obj ? (obj.designation ? obj.designation : '') : '';
    this.image = obj ? (obj.image ? obj.image : null) : null;
    this.priceUnit = obj ? (obj.priceUnit ? obj.priceUnit : 0) : 0;
    this.priceUnitWholesaler = obj ? (obj.priceUnitWholesaler ? obj.priceUnitWholesaler : 0) : 0;
    this.priceUnitSemiWholesaler = obj ? (obj.priceUnitSemiWholesaler ? obj.priceUnitSemiWholesaler : 0) : 0;
    this.stockMinim = obj ? (obj.stockMinim ? obj.stockMinim : 0) : 0;
    this.stockAlert = obj ? (obj.stockAlert ? obj.stockAlert : 0) : 0;
    this.volume = obj ? (obj.volume ? obj.volume : 0) : 0;
    this.note = obj ? (obj.note ? obj.note : '') : '';
    this.state = obj ? (obj.state ? obj.state : new State()) : new State();
    this.emplacement = obj ? (obj.emplacement ? obj.emplacement : new Emplacement()) : new Emplacement();
    this.measureUnit = obj ? (obj.measureUnit ? obj.measureUnit : new MeasureUnit) : new MeasureUnit;
    this.productCategory = obj ? (obj.productCategory ? obj.productCategory : new GenericCategory()) : new GenericCategory();
    this.appColor = obj ? (obj.appColor ? obj.appColor : new AppColor()) : new AppColor();
  }
}
