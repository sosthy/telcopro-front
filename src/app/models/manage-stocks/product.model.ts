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
    this.quantity = obj ? (obj.quantity ? obj.quantity : null) : null;
    this.dateCreation = obj ? (obj.dateCreation ? obj.dateCreation : null) : null;
    this.designation = obj ? (obj.designation ? obj.designation : null) : null;
    this.image = obj ? (obj.image ? obj.image : null) : null;
    this.priceUnit = obj ? (obj.priceUnit ? obj.priceUnit : null) : null;
    this.priceUnitWholesaler = obj ? (obj.priceUnitWholesaler ? obj.priceUnitWholesaler : null) : null;
    this.priceUnitSemiWholesaler = obj ? (obj.priceUnitSemiWholesaler ? obj.priceUnitSemiWholesaler : null) : null;
    this.stockMinim = obj ? (obj.stockMinim ? obj.stockMinim : null) : null;
    this.stockAlert = obj ? (obj.stockAlert ? obj.stockAlert : null) : null;
    this.volume = obj ? (obj.volume ? obj.volume : null) : null;
    this.note = obj ? (obj.note ? obj.note : null) : null;
    this.state = obj ? (obj.state ? obj.state : null) : null;
    this.emplacement = obj ? (obj.emplacement ? obj.emplacement : null) : null;
    this.measureUnit = obj ? (obj.measureUnit ? obj.measureUnit : null ) : null ;
    this.productCategory = obj ? (obj.productCategory ? obj.productCategory : null) : null;
    this.appColor = obj ? (obj.appColor ? obj.appColor : null) : null;
  }
}
