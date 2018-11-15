import {TELCOPRO_URL} from '../../../models/config.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {AppColor} from '../../../models/manage-stocks/app-color.model';

@Injectable()
export class ColorService {

  constructor(private http: Http, private auth: AuthenticationService) {
  }
  getAllappColor() {
    return this.http.get(TELCOPRO_URL + '/stocks/app-colors', this.auth.getHeaders()).map(res => res.json());
  }
  saveAppColor(appColor: AppColor) {
    return this.http.post(TELCOPRO_URL + '/stocks/app-colors', appColor, this.auth.getHeaders()).map(res => res.json());
  }
  deleteAppColor(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/app-colors/' + id, this.auth.getHeaders()).timeout(1000).map(res => res.json());
  }
  getAppColor(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/app-colors/' + id, this.auth.getHeaders());
  }
  searchColors(motCle: string) {
    return this.http.get(TELCOPRO_URL + '/stocks/app-colors/search?mc=' + motCle, this.auth.getHeaders()).map(res => res.json());
  }
}
