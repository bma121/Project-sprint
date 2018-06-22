import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {PushNotificationsModule, PushNotificationsService } from 'ng-push';
import { ActivatedRoute, Params } from '@angular/router';
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

    public shortBreakTime: number;
    public longBreakTime: number;
    public focusTime: number;
    public audio: HTMLAudioElement;
    length: any = '';
    desc: any = '' ;
  constructor(private pushNotifications: PushNotificationsService , private routeActive: ActivatedRoute ) {
        this.time = 0;

        this.focus = false;
        this.pause = false;
        this.timerActive = false;

        this.currentState = 0;
        this.currentStateName = 'Timer';

        this.shortBreakTime = 100;
        this.longBreakTime = 900;
        this.focusTime = 1500;
        this.audio = new Audio();


  }

  ngOnInit() {

       this.routeActive.queryParams.subscribe (params => {
          this.length = params['length'];
          this.desc = params['description'];
        });

        this.pushNotifications.requestPermission();
        this.audio.src = '../assets/beep.mp3';
        this.audio.load();
        this.startFocus(this.length);
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
  if (confirm('Stop the sprint?')) {
    this.currentState = time;
      this.setTimerSvg(time);

      this.currentStateName = this.changeCurrentState(time);

      this.focus = focus;
      this.time = time;
      this.startTimer();
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
                  this.audio.play();
                  this.notify();
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
