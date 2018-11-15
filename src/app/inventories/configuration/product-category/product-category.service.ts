import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {TELCOPRO_URL} from '../../../models/config.model';

@Injectable()
export class ProductCategoryService {

  constructor(private http: Http, private auth: AuthenticationService) {}


  getAllProductCategory() {
    return this.http.get(TELCOPRO_URL + '/stocks/categories', this.auth.getHeaders()).map(res => res.json());
  }

  getProductCategory(id) {
    return this.http.get(TELCOPRO_URL + '/');
  }

  saveProductCategory(menu) {
    return this.http.post(TELCOPRO_URL + '/stocks/categories', menu, this.auth.getHeaders()).map(res => res.json());
  }

  deleteProductCategory(id) {
    return this.http.delete(TELCOPRO_URL + '/stocks/categories/' + id, this.auth.getHeaders()).timeout(1000).map(res => res.json());
  }
  searchProductCategories(motCle: string) {
   return this.http.get(TELCOPRO_URL + '/stocks/categories/search?mc=' + motCle, this.auth.getHeaders()).map(res => res.json());
  }
}
