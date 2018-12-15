import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AuthenticationService} from '../authentication/authentication.service';
import {TELCOPRO_URL} from '../models/config.model';
@Injectable()
export class ResourceService {
  constructor(private http: Http, private auth: AuthenticationService) { }
  downloads(directory: string) {
    return this.http.get(TELCOPRO_URL + '/resources/download-files/' + directory, this.auth.getHeaders());
  }
  // DIRECTORY_PORTABLES_IMAGES
  download(fileName: string) {
    return this.http.get(TELCOPRO_URL + '/resources/download-file/' + fileName, this.auth.getHeaders());
  }
}
