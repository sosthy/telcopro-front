

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {TELCOPRO_URL} from "../../models/config.model";
import {AuthenticationService} from "../../authentication/authentication.service";
import {Mouvment} from "../../models/manage-stocks/mouvment.model";
import {MouvmentLine} from "../../models/manage-stocks/mouvment-line.model";

@Injectable()
export class TransactionService {

  constructor(private http: Http, private auth: AuthenticationService) {}

  getAllMouvment(){
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments', this.auth.getHeaders()).map(resp => resp.json());
  }

  getAllType(){
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/types', this.auth.getHeaders()).map(resp => resp.json());
  }

  saveMouvment(mouvment: Mouvment){
    return this.http.post(TELCOPRO_URL + '/stocks/mouvments', mouvment, this.auth.getHeaders()).map(resp => resp.json());
  }

  deleteMouvment(mouvment: Mouvment){
    return this.http.delete(TELCOPRO_URL + '/stocks/mouvments/' + mouvment.reference, this.auth.getHeaders()).map(resp => resp.json());
  }

  getAllMouventLine(id){
    return this.http.get(TELCOPRO_URL + '/stocks/mouvments/lines/' + id, this.auth.getHeaders()).map(resp => resp.json());
  }

  saveMouvmentLine(mouvmentLine: MouvmentLine){
    return this.http.post(TELCOPRO_URL + '/stocks/mouvments/lines', mouvmentLine, this.auth.getHeaders()).map(resp => resp.json());
  }

  getAllPortableItemOfProduct(id){
    return this.http.get(TELCOPRO_URL + '/stocks/portables/items-of-portable/' + id, this.auth.getHeaders()).map(resp => resp.json());
  }
}
