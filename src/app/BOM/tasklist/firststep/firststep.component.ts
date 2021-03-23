import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Components } from 'src/app/_models/components';
import { TaskName } from 'src/app/_models/taskName';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ComponentService } from 'src/app/_services/component.service';
import { TaskService } from 'src/app/_services/task.service';

@Component({
  selector: 'app-firststep',
  templateUrl: './firststep.component.html',
  styleUrls: ['./firststep.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class FirststepComponent implements OnInit {
  @Input() taskNameList: TaskName; 
  columnsToDisplay = ['buhNr', 'manufPartNr', 'qty', 'componentasId', 'bomNameId'];
  expandedElement: TaskName | null;
  components: Components;
  @Output() newItemEvent = new EventEmitter<boolean>();

  constructor(private componentService: ComponentService, private taskService: TaskService, private alertify: AlertifyService) {}

  ngOnInit(): void {
    
  }

  GetComponent(id: number){
    if (id == 0)   return;
    this.componentService
      .getComponent(id)
      .subscribe(
        (components: Components) => {
          this.components = components;
        },
        (error) => {
        }
      );
  }
  GoNext(name: string){
    this.taskNameList.status = "Checked";
    this.taskService.SetStatus(name, this.taskNameList).subscribe(next => {
      this.alertify.success('Pakeista sekmingai');
    }, error => {
      this.alertify.error(error);
    });
    this.newItemEvent.emit(true);
  }
}
