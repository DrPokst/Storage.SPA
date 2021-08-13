import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { ReelService } from 'src/app/_services/reel.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Reels } from 'src/app/_models/Reels';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BothComponent } from '../both/both.component';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-put-reel',
  templateUrl: './put-reel.component.html',
  styleUrls: ['./put-reel.component.css']
})
export class PutReelComponent implements OnInit {
  reels: Reels;
  model: any = {};
  model2: any = {};
  user: any = {};
  registerForm: any = {};
  vardas: any;
  jwtHelper = new JwtHelperService();
  @Output() history: EventEmitter<boolean> = new EventEmitter<boolean>();
  editForm: FormGroup;

  constructor(public dialog: MatDialog,
              private reelService: ReelService,
              private route: ActivatedRoute, private alertify: AlertifyService, public authService: AuthService) { }

  ngOnInit(): void {
    this.GetName();
  }
  SetLocation() {
    Swal.fire({
      icon: 'info',
      title: 'Pranešimas',
      text: 'Put the reel on the shelf',
      footer: '<a href>Nothing is happening?</a>'
    })
    this.model2.Id = this.model.Id;
    this.model2.QTY = this.model.QTY;
    this.model2.UserId = this.user.id;
    this.reelService.SetLocation(this.model2).subscribe(() => {
      this.alertify.success('sekmingai uzregistruota');
      this.history.emit(true);
      Swal.fire(
        {
        icon: 'success',
        title: 'Reels location set',
        showConfirmButton: false,
        timer: 1500
      })
    }, error => {
      this.alertify.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>'
      })
    });
    console.log(this.model);
  }
  GetName() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.getUserInfo(this.authService.decodedToken.unique_name).subscribe((user: User) => {
        this.user = user;
        this.model.UserId = this.user.id;
      }, error => {
        console.log(error);
      });
    }
  }

}

