import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import { AlertifyService } from './_services/alertify.service';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { cwd } from 'process';
import { ComponentService } from './_services/component.service';
import { Components } from './_models/components';


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
  search: string;
  
  constructor(public authService: AuthService, private componentService: ComponentService, private  alertify: AlertifyService, private router: Router){}
  
  ngOnInit(){
    this.GetName();
  }
  ngDoCheck() {
    if (this.user == null){
      if  (this.authService.loggedIn() != null)
    {
      this.ngOnInit();
    }
    }
    
  }
  GetName(){
    const token = localStorage.getItem('token');
    if (token){
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
      this.authService.getUserInfo(this.authService.decodedToken.unique_name).subscribe((user: User) => {
        this.user = user;
      }, error => {
        console.log(error);
      });
    }
  }
  loggedIn(){
    return this.authService.loggedIn();
  }
  
  onEnter() {
    this.componentService.getComponentMnf(this.search).subscribe((component: Components) => {
      this.router.navigate(['/members/'+ component.id]);
      this.search = '';
    }, error => {
      console.log(error);
    });
    
  }
  logout(){
    localStorage.removeItem('token');
    this.alertify.message('logged out');
    this.router.navigate(['/home']);
    this.user = null;
  }
}
