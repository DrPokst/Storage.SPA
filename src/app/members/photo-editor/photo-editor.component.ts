import { Component, OnInit, Input } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { ComponentService } from 'src/app/_services/component.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { CompareService } from 'src/app/_services/compare.service';
import { Components } from 'src/app/_models/components';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  response: string;
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
    this.uploader = new FileUploader({
      url: this.baseUrl + 'search/' + this.route.snapshot.params['id'] + '/photos',
      authToken: 'Bearer' + localStorage.getItem('token'),
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
        this.photos.push(photo);
      }
    }
  }

  deletePhoto(id: number){
    this.alertify.confirm('Are you sure want to delete this photo?', ()=> {
      this.componentService.deletePhoto(this.photos.findIndex(p => p.id === id), id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('photo has been deleted');
      }, error => {
        this.alertify.error('Failed to deltete the photo');
      });
    });
  }
}
