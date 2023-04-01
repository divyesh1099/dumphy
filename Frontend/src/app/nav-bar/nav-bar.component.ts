import { Component, OnInit } from '@angular/core';
import { User } from '../model/user';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  user : string = '' ;
  constructor(private alertifyService: AlertifyService){}

  ngOnInit(): void {
      
  }

  loggedIn(){
    this.user =  localStorage.getItem('token')!;
    return this.user;
  }

  onLogout(){
    this.alertifyService.success('Logged Out Successfully');
    return localStorage.removeItem('token');

  }
}
