import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Reels } from '../_models/Reels';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  user: User;
  reels: Reels[];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    this.getUserInfo();
  }

  getUserInfo() {
    this.authService.getUserInfo(this.authService.decodedToken.unique_name).subscribe((user: User) => {
      this.user = user;
      this.reels = user.reels;
      console.log(this.reels);
    }, error => {
      console.log(error);
    });
  }


}
