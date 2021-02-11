import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FileUploader } from 'ng2-file-upload';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { ComponentService } from 'src/app/_services/component.service';
import { environment } from 'src/environments/environment';
import { UserReelsComponent } from '../user-reels/user-reels.component';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input() useris: User;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response: string;
  jwtHelper = new JwtHelperService();
  baseUrl = environment.apiUrl;

  constructor(private authService: AuthService, private route: ActivatedRoute, private alertify: AlertifyService, 
  private componentService: ComponentService) { }

  ngOnInit(): void {
    this.initializeUploader();
    
    

  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }
  initializeUploader(){
      console.log(this.useris)
      this.uploader = new FileUploader({
        url: this.baseUrl + 'search/' + this.useris.id + '/userphotos',
        authToken: 'Bearer ' + localStorage.getItem('token'),
        isHTML5: true,
        allowedFileType: ['image'],
        removeAfterUpload: true,
        autoUpload: false,
        maxFileSize: 10 * 1024 * 1024
      });
      this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };
      this.uploader.onSuccessItem = (item, response, status, headers) => {
        if(response){
          const res: Photo = JSON.parse(response);
          const photo = {
            id: res.id,
            url: res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            isMain: res.isMain
          };
          this.useris.userPhoto.push(photo);
        }
      }
    
  }
/* 
  deletePhoto(id: number){
    this.alertify.confirm('Are you sure want to delete this photo?', ()=> {
      this.componentService.deletePhoto(this.photos.findIndex(p => p.id === id), id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('photo has been deleted');
      }, error => {
        this.alertify.error('Failed to deltete the photo');
      });
    });
  } */

}
