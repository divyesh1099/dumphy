import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit{

  constructor(private authService: AuthService, 
    private alertifyService: AlertifyService, 
    private router: Router){
    
  }

  ngOnInit(): void {
  }

  onLogin(loginForm: NgForm){
    let unauthenticatedUser: User = { userName: loginForm.value.userName, password: loginForm.value.password}
    let authenticatedUser = this.authService.authenticateUser(unauthenticatedUser);
    if(authenticatedUser){
      localStorage.setItem('token', authenticatedUser.userName);
      this.alertifyService.success("Login Successful");
      this.router.navigate(['/']);
    } else {
      this.alertifyService.error("Login Failed");
    }
  }
}
