import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TELCOPRO_URL} from '../models/config.model';
import {AuthenticationService} from '../authentication/authentication.service';
import { AppMenu } from '../models/appmenu.model';
import 'rxjs/add/operator/timeout';
import {PointOfSale} from '../models/pointOfSale.model';

@Injectable()
export class PointOfSaleService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getPointOfSales() {
    return this.http.get(TELCOPRO_URL + '/stocks/points-of-sale', this.auth.getHeaders());
  }
  getPointOfSale(id) {
    return this.http.get(TELCOPRO_URL + '/stocks/points-of-sale/' + id, this.auth.getHeaders());
  }
  savePointOfSale(pointOfSale: PointOfSale) {
    return this.http.post(TELCOPRO_URL + '/stocks/points-of-sale', pointOfSale, this.auth.getHeaders());
  }

  deletePointOfSale(id) {
    return this.http.delete(TELCOPRO_URL + '/stocks/points-of-sale/' + id, this.auth.getHeaders());
  }
  search(keyWords) {
    return this.http.get(TELCOPRO_URL + '/stocks/points-of-sale/search?mc=' + keyWords, this.auth.getHeaders());
  }
}
