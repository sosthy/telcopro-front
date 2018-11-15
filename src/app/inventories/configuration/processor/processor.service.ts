import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {TELCOPRO_URL} from '../../../models/config.model';
import {Cpu} from '../../../models/manage-stocks/cpu.model';

@Injectable()
export class ProcessorService {

  constructor(private http: Http, private auth: AuthenticationService) {}
  getAllProcessor() {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/cpus', this.auth.getHeaders()).map(res => res.json());
  }
  getProcessor(id: number) {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/cpus' + id, this.auth.getHeaders());
  }
  saveProcessor(cpu: Cpu) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/cpus', cpu, this.auth.getHeaders()).map(res => res.json());
  }
  deleteProcessor(id: number) {
   return this.http.delete(TELCOPRO_URL + '/stocks/portables/cpus/' + id, this.auth.getHeaders())
      .timeout(1000).map(res => res.json());
  }
  searchProcessors(motCle: string) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/cpus/search?mc=' + motCle, this.auth.getHeaders()).map(res => res.json());
  }
}
