


import {Component, OnInit} from "@angular/core";
import {Http} from "@angular/http";
import {ActivatedRoute} from "@angular/router";
import {GenericEntrepot} from "../../../models/manage-stocks/entrepot.model";
import {Emplacement} from "../../../models/manage-stocks/emplacement.model";
import {EntrepotService} from "../entrepots.services";

@Component({
  selector: 'app-list-emplacement',
  templateUrl: './list-emplacements.component.html',
  styleUrls: ['./list-emplacements.component.scss']
})
export class EmplacementListComponent implements OnInit {

  entrepot: GenericEntrepot;
  listEmplacement: Array<Emplacement> = new Array();

  constructor(public route: ActivatedRoute,
              private entrepotService: EntrepotService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if(params['name']) {
        this.entrepot = new GenericEntrepot(params);
        this.entrepotService.listAllEmplacement(this.entrepot.id).subscribe(resp => {
          this.listEmplacement = resp;
        });
      }
    });
  }

}
