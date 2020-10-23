import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AlertifyService } from './_services/alertify.service';
import { Router } from '@angular/router';
import { User } from './_models/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  jwtHelper = new JwtHelperService();
  events: string[] = [];
  opened: boolean;
  user: User;
  
  constructor(public authService: AuthService, private  alertify: AlertifyService, private router: Router){}
  
  ngOnInit(){
    const token = localStorage.getItem('token');
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    
    /* this.authService.getUser(this.authService.decodedToken).subscribe((user: User) => {
      this.user = user;
    }, error => {
      this.alertify.error(error);
    }); */

  }
  loggedIn(){
    return this.authService.loggedIn();
  }
  logout(){
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
  }
}
