import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Reels } from 'src/app/_models/Reels';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-reels',
  templateUrl: './user-reels.component.html',
  styleUrls: ['./user-reels.component.css']
})
export class UserReelsComponent implements OnInit {
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
