import {TELCOPRO_URL} from '../../../models/config.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Systemos} from '../../../models/manage-stocks/system-os.model';

@Injectable()
export class SystemosService {

   constructor(private http: Http, private auth: AuthenticationService) {
  }

  getAllSystemos() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/system-os',
      this.auth.getHeaders()).map(res => res.json());
  }

  saveSystemOs(systemOs: Systemos) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/system-os', systemOs,
      this.auth.getHeaders()).map(res => res.json());
  }
  getSystemOs(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/system-os' + id,
      this.auth.getHeaders());
  }

  deleteSystemOs(id: number) {
    return this.http.delete(TELCOPRO_URL + '/stocks/portables/system-os/' + id,
       this.auth.getHeaders()).timeout(1000).map(res => res.json());
  }
  searchSystemOs(motCle: string) {
     return this.http.get(TELCOPRO_URL + '/stocks/portables/system-os/search?mc=' + motCle, this.auth.getHeaders()).map(res => res.json());
  }
}
