import {Mouvment} from './mouvment.model';
export class Commande extends  Mouvment {
  succeed: boolean;
  limitDelayDate: Date;

  constructor(obj?: any) {
    super(obj);
    this.succeed = obj ? (obj.succeed ? obj.succeed : null) : null;
    this.limitDelayDate = obj ? (obj.limitDelayDate ? obj.limitDelayDate : null) : null;
  }
}
