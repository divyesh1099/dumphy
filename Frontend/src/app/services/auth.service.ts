import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  authenticateUser(user: User){
    let UserArray = [];
    if(localStorage.getItem('Users')){
      UserArray = JSON.parse(localStorage.getItem('Users')!);
    }
    return UserArray.find((authenticatedUser: User) => authenticatedUser.userName === user.userName && authenticatedUser.password === user.password)
  }
}
