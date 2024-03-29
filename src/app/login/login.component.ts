import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  registerMode = false;
 
  constructor(private authService: AuthService, private  alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }

  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }
  registerToggle(){
    this.registerMode = true;
  }

  register(){
    this.authService.register(this.model).subscribe(()=>{
      this.alertify.success('sekmingai uzregistruota');
    }, error => {
      this.alertify.error(error);
    });
  }

  
  login(){
    this.authService.login(this.model).subscribe(next => {
      this.alertify.success('Prisijungta sekmingai');
      this.router.navigate(['/']);
    }, error =>{
      this.alertify.error(error);
    }, ()=> {
      this.router.navigate(['/']);
    });
  }

  loggedIn(){
    return this.authService.loggedIn();
  }

}
