import {TELCOPRO_URL} from '../../../models/config.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {MeasureUnit} from '../../../models/manage-stocks/measure-unit.model';

@Injectable()
export class MeasureService {

  constructor(private http: Http, private auth: AuthenticationService) {
  }
   getAllMeasure() {
      return this.http.get(TELCOPRO_URL + '/stocks/measure-units',
       this.auth.getHeaders()).map(res => res.json());
  }
  saveMeasure(measureUnit: MeasureUnit) {
    return this.http.post(TELCOPRO_URL + '/stocks/measure-units', measureUnit,
      this.auth.getHeaders()).map(res => res.json());
  }
  getMeasusre(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/measure-units' + id,
       this.auth.getHeaders());
  }
  deleteMeasure(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/measure-units/' + id,
      this.auth.getHeaders()).timeout(1000).map(res => res.json());
  }
  searchMeasures(motCle: string) {
    return this.http.get(TELCOPRO_URL + '/stocks/measure-units/search?mc=' + motCle, this.auth.getHeaders()).map(res => res.json());
  }

}
