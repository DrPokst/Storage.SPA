import { Component, OnInit, Input } from '@angular/core';
import * as faker from 'faker';
import { BOM } from '../_models/BOM';
import { BOMService } from '../_services/BOM.service';
import { Components } from '../_models/components';
import { BomName } from '../_models/BomName';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import swalWithBootstrapButtons from 'sweetalert2/dist/sweetalert2.js';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { TaskService } from '../_services/task.service';
import { TaskName } from '../_models/taskName';

@Component({
  selector: 'app-BOM',
  templateUrl: './BOM.component.html',
  styleUrls: ['./BOM.component.css']
})
export class BOMComponent implements OnInit {
  bomNames: BomName[];
  taskNames: TaskName[];
  emitter: number;

  constructor(private router: Router, private bomService: BOMService, private alertify: AlertifyService, private taskService: TaskService) { }

  ngOnInit(): void {
    this.GetBomNames();
    this.GetTasks();
  }

  GetBomNames() {
    this.bomService.GetBomNames().subscribe((bomNames: BomName[]) => {
      this.bomNames = bomNames;
    }, error => {
      console.log(error);
    });
  }

  GetTasks(){
    this.taskService.GetTasks().subscribe((taskName: TaskName[]) =>{
      this.taskNames = taskName;
    }, error => {
      console.log(error);
    });
  }

  

deleteBom(name: string){
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.bomService.deleteBom(name).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Your file has been deleted.',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit();
        this.router.navigate(['/bom']);
      }, error => {
        this.alertify.error('Failed to delete');
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  });
}

deleteTask(name: string){
  swalWithBootstrapButtons.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      this.taskService.DeleteTask(name).subscribe(() => {
        Swal.fire({
          icon: 'success',
          title: 'Your file has been deleted.',
          showConfirmButton: false,
          timer: 1500
        })
        this.ngOnInit();
        this.router.navigate(['/bom']);
      }, error => {
        this.alertify.error('Failed to delete');
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire(
        'Cancelled',
        'Your imaginary file is safe :)',
        'error'
      )
    }
  });
}

}
