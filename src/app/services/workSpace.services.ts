import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {TELCOPRO_URL} from '../models/config.model';
import {AuthenticationService} from '../authentication/authentication.service';
import 'rxjs/add/operator/timeout';
import {WorkSpace} from '../models/workSpace.model';

@Injectable()
export class WorkSpaceService {

  constructor(private http: Http, private auth: AuthenticationService) { }

  getWorkSpaces() {
    return this.http.get(TELCOPRO_URL + '/rh/workSpaces', this.auth.getHeaders());
  }
  getWorkSpace(id) {
    return this.http.get(TELCOPRO_URL + '/rh/workSpaces/' + id, this.auth.getHeaders());
  }
  saveWorkSpace(workSpace: WorkSpace) {
    return this.http.post(TELCOPRO_URL + '/rh/workSpaces', workSpace, this.auth.getHeaders());
  }
  deleteWorkSpace(id) {
    return this.http.delete(TELCOPRO_URL + '/rh/workSpaces/' + id, this.auth.getHeaders());
  }
  search(keyWords) {
    return this.http.get(TELCOPRO_URL + '/rh/workSpaces/search?mc=' + keyWords, this.auth.getHeaders());
  }
}
