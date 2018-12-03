import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../../authentication/authentication.service';
import {TELCOPRO_URL} from '../../../models/config.model';
import {PortableItem} from '../../../models/manage-stocks/portable-item.model';


@Injectable()
export class PortableItemServices {
  constructor(public http: Http, public authenticationService: AuthenticationService) {

  }

  // ===========================Listing, Modification et Sauvegarde des items liés au portable===================================
  listAllPortableItem() {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/items', this.authenticationService.getHeaders());
  }
  getPortableItems(idPortable) {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/items-of-portable/' + idPortable, this.authenticationService.getHeaders());
  }
  listPortableItem(id: number) {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/items/' + id, this.authenticationService.getHeaders());
  }
  savePortableItem(item: PortableItem) {
    return this.http.post(TELCOPRO_URL + '/stocks/portables/items', item, this.authenticationService.getHeaders());
  }
  deletePortableItem(id: number) {
   return this.http.delete(TELCOPRO_URL + '/stocks/portables/items/' + id, this.authenticationService.getHeaders());
  }
  searchPortableItem(idPortable, motCle: string) {
   return this.http.get(TELCOPRO_URL + '/stocks/portables/items/search?mc=' + motCle + '&&portable=' + idPortable,
     this.authenticationService.getHeaders());
  }
}
