import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  constructor(){}
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.maxLength(10)])
    }, this.passwordMatchingValidator);
  }
  // Custom Validator To CHeck if Password and Confirm Passwords Match or not
  passwordMatchingValidator(fg: AbstractControl): Validators{
    if (fg.get('password')?.value === fg.get('confirmPassword')?.value){
      return true;
    }
    else {
      return {notmatched: true}
    }
  }

  // The Catch with the getter methods is that they cannot take any arguments and should return something
  get userName(){
    return this.registrationForm.get('userName') as FormControl;
  }
  
  get email(){
    return this.registrationForm.get('email') as FormControl;
  }

  get password(){
    return this.registrationForm.get('password') as FormControl;
  }

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword') as FormControl;
  }

  get mobile(){
    return this.registrationForm.get('mobile') as FormControl;
  }
  onSubmit(){
    console.log(this.registrationForm);
  }
}
