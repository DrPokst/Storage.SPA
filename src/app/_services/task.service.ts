import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskList } from '../_models/taskList';
import { TaskName } from '../_models/taskName';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) { }

  RegisterTask(model: any) {
    return this.http.post(this.baseUrl + 'task', model);
  }
  GetTasks(): Observable<TaskName[]>{
    return this.http.get<TaskName[]>(this.baseUrl + 'task');
  }
  GetTask(name: string): Observable<TaskName>{
    return this.http.get<TaskName>(this.baseUrl + 'task/' +  name);
  }
  DeleteTask(taskName: string) {
    return this.http.delete(this.baseUrl + 'task/' + taskName);
  }
  SetStatus(name: string, task: TaskName){
    return this.http.put(this.baseUrl + 'task/' + name, task);
  }
  GetCheckedTaskList(name: string): Observable<TaskList[]>{
    return this.http.get<TaskList[]>(this.baseUrl + 'task/' + name + '/check');
  }
  GetCheckedForShortTaskList(name: string): Observable<TaskList[]>{
    return this.http.get<TaskList[]>(this.baseUrl + 'task/' + name + '/check/short');
  }
 }


