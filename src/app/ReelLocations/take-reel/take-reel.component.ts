import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reels } from 'src/app/_models/Reels';
import { ReelService } from 'src/app/_services/reel.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-take-reel',
  templateUrl: './take-reel.component.html',
  styleUrls: ['./take-reel.component.css']
})
export class TakeReelComponent implements OnInit {
  model: any = {};
  model2: any = {};
  user: any = {};
  jwtHelper = new JwtHelperService();
  @Output() history: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private reelService: ReelService, private route: ActivatedRoute, private alertify: AlertifyService, public authService: AuthService) { }

  ngOnInit(): void {
    this.GetName();
  }

  SetLocation() {
    this.model2.Id = this.model.Id;
    this.model2.QTY = this.model.QTY;
    this.model2.UserId = this.model.UserId;
    this.reelService.SetLocationWithLocation(this.model).subscribe(()=>{
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
  }
  GetName() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.getUserInfo(this.authService.decodedToken.unique_name).subscribe((user: User) => {
        this.user = user;
        this.model.UserId = this.user.id;
        console.log(this.model.UserId);
      }, error => {
        console.log(error);
      });
    }
  }
}
