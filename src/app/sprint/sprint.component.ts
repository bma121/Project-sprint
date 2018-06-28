import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Router ,  NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SprintService } from '../../app/sprint.service';
import { Sprint } from '../../app/sprint.model';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  public selectedValue: any = '' ;
  public term: any = '';
  private subSprint: Subscription;
  theSprint: Sprint[] = [];
  username = '';
  responseData: any;

  sprints =  [
    {value:  '5',  viewValue:  'Instant(5s)'},
    {value:  '300',  viewValue:  'Very short(5min)'},
    {value:  '600',  viewValue:  'Short (10min)'},
    {value:  '1500',  viewValue:  'Pomodoro (25min)'},
    {value:  '2700',  viewValue:  'Long (45min)'},
    {value:  '3600',  viewValue:  'Very long (60min)'},

    ];
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  disableEnable() {
    this.staticTabs.tabs[2].disabled = !this.staticTabs.tabs[2].disabled;
  }

  onAddPost(_form: NgForm) {
      // tslint:disable-next-line:no-shadowed-variable
      const NavigationExtras:  NavigationExtras = {
      queryParams :  {'description' : _form.value.description , 'length' : _form.value.length,
      'check': _form.controls['defaultCheck12'].value },
      fragment : 'anchor'
      };
      console.log(NavigationExtras.queryParams);
     this.router.navigate(['/spinner'] , NavigationExtras);
  }
  constructor( private router: Router, private newService: SprintService) {
  }


  ngOnInit() {
    this.username = localStorage.getItem('user');
    this.newService.getSprint();
    this.subSprint = this.newService.getSprintUpdateListener()
    .subscribe((sp: Sprint[]) => {
      this.theSprint = sp;
    });

  }

  onDelete() {
    this.newService.deleteAllSprint();
  }


}

