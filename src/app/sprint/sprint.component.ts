import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';



@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  maxSize = 5;
  bigTotalItems = 175;
  bigCurrentPage = 1;
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  disableEnable() {
    this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }
  constructor() { }

  ngOnInit() {
  }

}

