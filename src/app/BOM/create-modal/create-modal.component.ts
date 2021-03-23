import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap';
import { delay } from 'rxjs/operators';
import { BomName } from 'src/app/_models/BomName';
import { TaskService } from 'src/app/_services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {
  bomNames: BomName[];
  registerForm: FormGroup;
  
    
  constructor(public bsModalRef: BsModalRef, private taskService: TaskService) { }

  ngOnInit(): void {

    this.registerForm = new FormGroup(
      {
        Name: new FormControl(),
        BomName: new FormControl(),
        Qty: new FormControl()
      }

    );

  }

  submit(){

    const formData = new FormData();

    formData.append('Name', this.registerForm.get('Name').value);
    formData.append('BomName', this.registerForm.get('BomName').value);
    formData.append('Qty', this.registerForm.get('Qty').value);

    this.taskService.RegisterTask(formData). subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Your task has been registered',
        showConfirmButton: false,
        timer: 1500
      })
      
      this.bsModalRef.hide();
      window.location.reload();
    }, error => {
      
    });

    console.log(formData);
    this.registerForm.reset();
  }

}
