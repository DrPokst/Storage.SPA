import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BOM } from 'src/app/_models/BOM';
import { Components } from 'src/app/_models/components';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { BOMService } from 'src/app/_services/BOM.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  @ViewChild('UploadFileInput', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  @Output() bomuploaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router, public authService: AuthService, private bomService: BOMService,
              private  alertify: AlertifyService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
    
  }

  onFileSelect(event) {

    let af = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel']
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      // console.log(file);

      if (!_.includes(af, file.type)) {
        alert('Only EXCEL Docs Allowed!');
      } else {
        this.fileInputLabel = file.name;
        this.fileUploadForm.get('myfile').setValue(file);
      }
    }}

  onFormSubmit(){

    if (!this.fileUploadForm.get('myfile').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('file', this.fileUploadForm.get('myfile').value);
    formData.append('User', 'Domas');


    this.bomService.UploadBom(formData). subscribe(()=>{
      Swal.fire({
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.bomuploaded.emit(true);
    }, error => {
      this.alertify.error(error);
    });
    
    console.log(formData);
  }


}  
