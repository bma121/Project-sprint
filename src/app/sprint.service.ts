import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { map } from 'rxjs/operators';


import { HttpClient } from '@angular/common/http';
import { Sprint } from './sprint.model';

@Injectable({
  providedIn: 'root'
})
export class SprintService {

  private sprints: Sprint[] = [];
  private sprintUpdated = new Subject();

  constructor(private http: HttpClient) { }

  addSprint(length: string , status: string , data: string , start: string , finish: string , description: string) {
    console.log('length:' + length + '-- status:' + status);
    const sprint = {id: null ,
       length: length ,
       status: status ,
       createdAt: data ,
       startedAt: start ,
       finishedAt: finish ,
       description: description};
    console.log(sprint);
    this.http.post('http://localhost:3000/api/sprint', sprint)
    .subscribe(responseData => {
      console.log(responseData);
      this.sprints.push(sprint);
      this.sprintUpdated.next([...this.sprints]);   // send data to out
    });

  }
  getSprint() {
   this.http.get<{message: string, sprints: any}>('http://localhost:3000/api/sprint')
    .pipe(map((sprintData) => {
      return sprintData.sprints.map(sprint => {
        return {
          length: sprint.length,
          status: sprint.status,
          createdAt: sprint.createdAt,
          startedAt: sprint.startedAt,
          finishedAt: sprint.finishedAt,
          description: sprint.description,
          id: sprint._id
        };
      });
    })).subscribe(transformedSprint => {
      this.sprints = transformedSprint;
      this.sprintUpdated.next([...this.sprints]);
    });
  }

  getSprintUpdateListener() {
    return this.sprintUpdated.asObservable();
  }


  deleteAllSprint() {

    this.http.delete('http://localhost:3000/api/sprint').subscribe(() => {
      console.log('Deleted!!!!');
      this.getSprint();

    });
  }
}
