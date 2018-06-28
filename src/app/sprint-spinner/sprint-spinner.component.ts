import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PushNotificationsService } from 'ng-push';
import { ActivatedRoute, Router } from '@angular/router';
import { SprintService } from '../../app/sprint.service';


@Component({
  selector: 'app-sprint-spinner',
  templateUrl: './sprint-spinner.component.html',
  styleUrls: ['./sprint-spinner.component.scss']
})
export class SprintSpinnerComponent implements OnInit {
  @ViewChild('bar') bar: ElementRef;

    public time: number;
    public count: number;

    public focus: boolean;
    public pause: boolean;
    public timerActive: boolean;

    public currentState: number;
    public currentStateName: string;

    public lengthValue: string;
    public Value1: number;
    public Value2: number;
    public Value3: number;
    public Value4: number;
    public Value5: number;
    public Value6: number;

    public focusTime: number;
    public audio: HTMLAudioElement;
    length: number ;
    desc: any = '' ;
    date: any = '';
    startHours: any = '';
    endHours: any = '';
    stopHours: any = '';
    month: any = '';
    checkBox: boolean;

  constructor(private pushNotifications: PushNotificationsService , private routeActive: ActivatedRoute,
    private service: SprintService, private router: Router) {
        this.time = 0;

        this.focus = false;
        this.pause = false;
        this.timerActive = false;

        this.currentState = 0;
        this.currentStateName = 'Timer';
        this.lengthValue = '';
        this.focusTime = 1500;
        this.audio = new Audio();

        this.Value1 = 5;
        this.Value2 = 300;
        this.Value3 = 600;
        this.Value4 = 1500;
        this.Value5 = 2700;
        this.Value6 = 3600;


  }

  ngOnInit() {

       this.routeActive.queryParams.subscribe (params => {
          this.length = params['length'];
          this.desc = params['description'];
          this.checkBox = params['check'];

        });

        this.pushNotifications.requestPermission();
        this.audio.src = '../assets/beep.mp3';
        this.audio.load();
        this.startFocus(this.length);
        this.month = new Date().getMonth() + 1;
        const val = +this.length;

        this.lengthValue = this.lengthViewValue(val);

        this.date = new Date().getFullYear() + '-' + this.month + '-' + new Date().getDate();
        this.startHours = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
  }

  notify() {
    const options = {
        body: `Your ${this.currentStateName} has ended.`,
        icon: '../assets/logo.png'
    };

    this.pushNotifications.create('Timeout!', options)
        .subscribe(res => {
            if (res.event.type === 'click') {
                res.notification.close();

            }

        });
}

public setTimer(time: number, focus: boolean = false) {
  this.currentState = time;
  this.setTimerSvg(time);

  this.currentStateName = this.changeCurrentState(time);

  this.focus = focus;
  this.time = time;
  this.startTimer();
}

public setTimerToZero(time: number, focus: boolean = false) {
  if (confirm('Stop the sprint?') === true) {
      this.currentState = time;
      this.setTimerSvg(time);
      this.currentStateName = this.changeCurrentState(time);

      this.focus = focus;
      this.time = time;
      this.startTimer();
      this.stopHours = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
      this.service.addSprint(this.lengthValue, 'Canceled', this.date, this.startHours, this.stopHours, this.desc );
      this.router.navigate(['/sprint']);
  }
}

private lengthViewValue(val: any): string {
  switch (val) {
    case this.Value1:
     return 'Instant(5s)';
    case this.Value2:
     return  'Very short(5min)';
    case this.Value3:
     return 'Short (10min)';
    case this.Value4:
    return 'Pomodoro (25min)';
    case this.Value5:
    return 'Long (45min)';
    case this.Value6:
    return  'Very long (60min)';
  }
}

private changeCurrentState(time: number): string {
  switch (time) {
      case this.length:
          return this.desc;
      default:
          return 'set timer';
  }
}

public setTimerSvg(time: number) {
  this.bar.nativeElement.style.strokeDashoffset = this.changeBarStroke(time);
}

private changeBarStroke(time: number): string {
  if (time === 0) {
      return '0';
  }

  return (848.23 * (1 - time / this.currentState)).toString();
}



public startFocus(length: number) {
  this.focus = true;
  this.count = 0;
  this.setTimer(length, true);
}

public togglePause() {
  this.pause = !this.pause;
  this.startTimer();
}

public startTimer() {
  if (!this.timerActive || this.currentState === 0) {
      this.timerActive = true;
      this.timer();
  }
}

public timer() {
  if (this.time > 0 && !this.pause) {
      setTimeout(() => {
          if (this.time > 0) {
              if (this.time - 1 === 0) {
                  this.timerActive = false;
                  this.endHours = new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
                  this.service.addSprint(this.lengthValue, 'Completed', this.date, this.startHours, this.endHours, this.desc );

                  if (this.checkBox) {
                     this.audio.play();
                     this.notify();
                  }
                  this.router.navigate(['/sprint']);
              }
              this.time -= 1;
              this.setTimerSvg(this.time);
              this.timer();
          }
      }, 1000);
  } else {
      this.timerActive = false;
      if (this.focus && !this.pause) {
          this.count++;

      }
  }

}

}
