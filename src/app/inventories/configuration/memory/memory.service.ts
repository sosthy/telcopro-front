import {TELCOPRO_URL} from '../../../models/config.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {Memory} from '../../../models/manage-stocks/memory.model';

@Injectable()
export class MemoryService {

  constructor(private http: Http, private auth: AuthenticationService) {
  }
  // ============================Listing, Modification et Sauvegarde des mémoires liés au portable===========================
  getAllMemory() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/memories', this.auth.getHeaders()).map(res => res.json());
  }
  getMemory(id: number) {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/memories' + id, this.auth.getHeaders());
  }
  saveMemory(memory: Memory) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/memories', memory, this.auth.getHeaders()).map(res => res.json());
  }
  deleteMemory(id: number) {
   return this.http.delete(TELCOPRO_URL + '/stocks/portables/memories/' + id, this.auth.getHeaders())
      .timeout(1000).map(res => res.json());
  }
}
