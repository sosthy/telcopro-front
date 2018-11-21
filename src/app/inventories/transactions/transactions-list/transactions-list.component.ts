
import {Component, OnInit} from "@angular/core";
import {NgbPanelChangeEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  acc: any;

  ngOnInit(): void {

  }

  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === '2') {
      $event.preventDefault();
    }
    if ($event.panelId === '3' && $event.nextState === false) {
      $event.preventDefault();
    }
  }

}
