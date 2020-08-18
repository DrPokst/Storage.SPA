import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


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
    }, error =>{
      this.alertify.error(error);
    }, ()=> {
      this.router.navigate(['/members']);
    });
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
