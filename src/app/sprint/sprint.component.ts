import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';
import { Router ,  NavigationExtras } from '@angular/router';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {
  maxSize = 5;
  bigTotalItems = 175;
  bigCurrentPage = 1;
  public selectedValue: any = '' ;
  username = '';

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

    // if  ( _form.invalid) {
    //   alert('please innput description');
    //   return;
    // }

    console.log(this.selectedValue);
      console.log(_form.value);
      // tslint:disable-next-line:no-shadowed-variable
      const NavigationExtras:  NavigationExtras = {
      queryParams :  {'description' : _form.value.description , 'length' : _form.value.length },
      fragment : 'anchor'
      };
     this.router.navigate(['/spinner'] , NavigationExtras);
  }
  constructor( private router: Router) { }

  ngOnInit() {
    this.username = localStorage.getItem('user');
  }

}

