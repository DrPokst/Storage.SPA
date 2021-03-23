import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskList } from 'src/app/_models/taskList';

@Component({
  selector: 'app-secondstep',
  templateUrl: './secondstep.component.html',
  styleUrls: ['./secondstep.component.css']
})
export class SecondstepComponent implements OnInit {
@Input() checkedTaskList: TaskList[];
@Input() checkedForShortTaskList: TaskList[];
@Output() newItemEvent = new EventEmitter<boolean>();
editEmitter: boolean;
  constructor() { }

  ngOnInit(): void {
  }

  Refresh(){
    this.newItemEvent.emit(true);
  }
  
}
