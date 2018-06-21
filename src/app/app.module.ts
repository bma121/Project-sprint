import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule, MatButtonModule, MatTabsModule, MatCardModule } from '@angular/material';
import { PaginationModule, TabsModule} from 'ngx-bootstrap';
import { PushNotificationsModule } from 'ng-push';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SprintComponent } from './sprint/sprint.component';
import { HomeComponent } from './home/home.component';
import { AuthService } from './auth/auth.service';



import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './/app-routing.module';
import { SprintSpinnerComponent } from './sprint-spinner/sprint-spinner.component';
import { MinuteSecondsPipe } from './minute-seconds.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SprintComponent,
    HomeComponent,
    SprintSpinnerComponent,
    MinuteSecondsPipe
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    PushNotificationsModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
