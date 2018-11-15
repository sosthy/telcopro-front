import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {TELCOPRO_URL} from '../../../models/config.model';

@Injectable()
export class PhoneCategoryService {

  constructor(private http: Http, private auth: AuthenticationService) {}


  getAllPhoneCategory() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/categories', this.auth.getHeaders()).map(res => res.json());
  }

  getPhoneCategory(id) {
    return this.http.get(TELCOPRO_URL + '/');
  }

  savePhoneCategory(menu) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/categories', menu, this.auth.getHeaders()).map(res => res.json());
  }

  deletePhoneCategory(id) {
    return this.http.delete(TELCOPRO_URL + '/stocks/portables/categories/' + id, this.auth.getHeaders())
      .timeout(1000).map(res => res.json());
  }
  searchPhoneCategories(motCle: string) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/categories/search?mc=' + motCle, this.auth.getHeaders()).map(res => res.json());
  }
}
