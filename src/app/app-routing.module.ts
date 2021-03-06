import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { SprintComponent } from './sprint/sprint.component';
import { HomeComponent } from './home/home.component';
import { SprintSpinnerComponent } from './sprint-spinner/sprint-spinner.component';

const routes: Routes = [
  {path: '', component : HomeComponent },
  {path: 'sprint', component : SprintComponent},
  {path: 'spinner', component : SprintSpinnerComponent},
];
@NgModule({
  exports: [ RouterModule ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})


export class AppRoutingModule { }
