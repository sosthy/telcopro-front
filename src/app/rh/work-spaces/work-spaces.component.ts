import {Component, OnInit} from '@angular/core';
import {WorkSpaceService} from '../../services/workSpace.services';
import {WorkSpace} from '../../models/workSpace.model';

@Component({
  selector: 'app-work-spaces',
  templateUrl: './work-spaces.component.html',
  styleUrls: ['./work-spaces.component.scss']
})

export class WorkSpacesComponent implements OnInit {
  listWorkSpaces = [];
  keyWords = '';
  pageToLoad = 'listing page'; // listing page, add page, edit page, details page, confirm edit page, confirm add page
  tableMessage = 'Loading.... Please wait!';
  workSpace: any;
  constructor(public workSpaceService: WorkSpaceService) { }
  ngOnInit() {
    this.loadWorkSpaces();
  }
  loadWorkSpaces() {
    this.workSpaceService.getWorkSpaces()
      .subscribe(data => {
        this.listWorkSpaces = data.json();
        this.tableMessage = 'No workSpace found';
      },
        err => {
        console.log(err);
        }
        );
  }
  search() {
    this.workSpaceService.search(this.keyWords)
      .subscribe(data => {
        this.listWorkSpaces = data.json();
        this.tableMessage = 'No results matching';
      },
        err => {
        console.log(err);
        }
        );
  }
  loadAddPage() {
    this.workSpace = new WorkSpace();
    this.pageToLoad = 'add page';
  }
  submitForm() {
    this.pageToLoad = 'confirm ' + this.pageToLoad;
  }
  loadEditionPage(workSpace) {
    this.workSpace = workSpace;
    this.pageToLoad = 'edit page';
  }
  loadPreviewPageConfirmation() {
    if (this.pageToLoad === 'confirm edit page') {
      this.pageToLoad = 'edit page';
    } else {
      this.pageToLoad = 'add page';
    }
  }
  deleteWorkSpaceRequest(workSpace) {
    const confirm = window.confirm('WorkSpace ' + workSpace.name + ' ' + workSpace.surname + ' will be detete.');
    if (confirm === true) {
      this.listWorkSpaces.splice( this.listWorkSpaces.indexOf(workSpace), 1);
      this.workSpaceService.deleteWorkSpace(workSpace.id)
        .subscribe(data => {
          alert('WorkSpace ' + workSpace.name + ' ' + workSpace.surname + ' has been succeful removed');
        },
          err => {
          alert('problem');
          });
    }
  }
  loadDetailPage(workSpace) {
    this.workSpace = workSpace;
    this.pageToLoad = 'details page';
  }
  saveInformation() {
    const page = this.pageToLoad;
     this.workSpaceService.saveWorkSpace(this.workSpace)
     .subscribe(data => {
        this.workSpace = data.json();
        if (page === 'confirm add page') {
          this.listWorkSpaces.push(this.workSpace);
        }
      },
        err => {
        console.log(err);
        });
      alert('WorkSpace ' + this.workSpace.name + ' ' + this.workSpace.surname + ' has been succeful done.');
      this.pageToLoad = 'listing page';
  }
}
