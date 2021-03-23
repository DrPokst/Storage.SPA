import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskList } from 'src/app/_models/taskList';
import { TaskName } from 'src/app/_models/taskName';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {
  taskNameList: TaskName;
  checkedTaskList: TaskList[];
  checkedForShortTaskList: TaskList[];
  stateEmitter: number;

  constructor(private _formBuilder: FormBuilder, private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.GetTask();
  }


  GetTask() {
    this.taskService.GetTask(this.route.snapshot.params['name']).subscribe((taskName: TaskName) => {

      this.taskNameList = taskName;

      switch (this.taskNameList.status) {
        case "Created":
          this.stateEmitter = 1;
          break;
        case "Checked":
          this.stateEmitter = 2;
          this.GetCheckedTaskList();
          break;
        default:
          this.stateEmitter = 0;
          break;
      }

    }, error => {

    });
  }

  GetCheckedTaskList() {
    this.taskService.GetCheckedTaskList(this.route.snapshot.params['name']).subscribe((taskList: TaskList[]) => {
      this.checkedTaskList = taskList;
    }, error => {
    });

    this.taskService.GetCheckedForShortTaskList(this.route.snapshot.params['name']).subscribe((taskList: TaskList[]) => {
      this.checkedForShortTaskList = taskList;
    }, error => {
    });
  }
  
  addItem(newItem: boolean) {
    this.GetCheckedTaskList();
    this.stateEmitter = 2;
  }

}
