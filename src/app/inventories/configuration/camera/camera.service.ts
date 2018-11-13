import {TELCOPRO_URL} from '../../../models/config.model';
import {Camera} from '../../../models/manage-stocks/camera.model';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/timeout';
import {AuthenticationService} from '../../../authentication/authentication.service';

@Injectable()
export class CameraService {

  constructor(private http: Http, private auth: AuthenticationService) {
  }

  getAllCamera() {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/cameras',
      this.auth.getHeaders()).map(res => res.json());
  }

  saveCamera(camera: Camera) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/cameras', camera,
      this.auth.getHeaders()).map(res => res.json());
  }
  getCamera(id: number) {
    return this.http.get(TELCOPRO_URL + '/stocks/portables/cameras' + id,
      this.auth.getHeaders());
  }

   deleteCamera(id: number) {
     return this.http.get(TELCOPRO_URL + '/stocks/portables/cameras/' + id, this.auth.getHeaders())
      .timeout(1000).map(res => res.json());
   }
 }
