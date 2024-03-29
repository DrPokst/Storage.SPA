import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ReelService } from 'src/app/_services/reel.service';
import { ComponentService } from 'src/app/_services/component.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-componentregister',
  templateUrl: './componentregister.component.html',
  styleUrls: ['./componentregister.component.css']
})
export class ComponentregisterComponent implements OnInit {
  model: any = {};
  public imagePath;
  imageURL: string = null;
  url: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  
  constructor(private reelService: ReelService, private  alertify: AlertifyService, private componentService: ComponentService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        Mnf: new FormControl(),
        Manufacturer: new FormControl(),
        Detdescription: new FormControl(),
        BuhNr: new FormControl(),
        Size: new FormControl(),
        Type: new FormControl(),
        Nominal: new FormControl(),
        Furl: new FormControl(),
        Durl: new FormControl(),
        Murl: new FormControl(),
        file: new FormControl('', [Validators.required]),
        fileSource: new FormControl('', [Validators.required])
      }
    );
  }
  onFileChange(event) {

  

    if (event.target.files.length > 0) {

      const file = event.target.files[0];

      this.registerForm.patchValue({

        fileSource: file

      });

    }
  }

  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.registerForm.patchValue({
      fileSource: file
    });
    this.registerForm.get('fileSource').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    };
    reader.readAsDataURL(file);

    if (file == null) {
      this.imageURL = null;
    }

  }

  submit(){

    const formData = new FormData();

    formData.append('file', this.registerForm.get('fileSource').value);
    formData.append('Mnf', this.registerForm.get('Mnf').value);
    formData.append('Manufacturer', this.registerForm.get('Manufacturer').value);
    formData.append('Detdescription', this.registerForm.get('Detdescription').value);
    formData.append('BuhNr', this.registerForm.get('BuhNr').value);
    formData.append('Size', this.registerForm.get('Size').value);
    formData.append('Type', this.registerForm.get('Type').value);
    formData.append('Nominal', this.registerForm.get('Nominal').value);
    formData.append('Furl', this.registerForm.get('Furl').value);
    formData.append('Durl', this.registerForm.get('Durl').value);
    formData.append('Murl', this.registerForm.get('Murl').value);

    this.model = Object.assign({}, this.registerForm.value);


    this.componentService.registerComponent(formData). subscribe(()=>{
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
    this.imageURL = null;

    
  }

  

  cancel(){
    this.cancelRegister.emit(false);
    console.log('canceled');
  }
}
