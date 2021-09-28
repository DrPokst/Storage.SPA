import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ComponentService } from 'src/app/_services/component.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fast-componentreg',
  templateUrl: './fast-componentreg.component.html',
  styleUrls: ['./fast-componentreg.component.scss']
})
export class FastComponentregComponent implements OnInit {

  constructor(private  alertify: AlertifyService, private componentService: ComponentService, private router: Router) { }
  registerForm: FormGroup;
  model: any = {};

  ngOnInit() {
    this.registerForm = new FormGroup(
      {
        Mnf: new FormControl('', [Validators.required]),
        BuhNr: new FormControl('', [Validators.required])
      }
    );
  }

  submit(){

    const formData = new FormData();

    formData.append('Mnf', this.registerForm.get('Mnf').value);
    formData.append('BuhNr', this.registerForm.get('BuhNr').value);

    this.model = Object.assign({}, this.registerForm.value);


    this.componentService.fastregisterComponent(formData). subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Your component has been registered',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigate(['/members']);
    }, error => {
      this.alertify.error(error);
    });
    this.registerForm.reset();


  }
}
