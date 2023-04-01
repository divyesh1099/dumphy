import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  userSubmitted: boolean = false;
  user: User = {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: 0
  };
  constructor(private fb: FormBuilder, private userService: UserService, private alertifyService: AlertifyService){}
  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [Validators.required]),
      mobile: new FormControl(null, [Validators.maxLength(10)])
    }, this.passwordMatchingValidator);
  }

  createRegistrationForm(){
    // this.registrationForm = this.fb.group({
    //   userName: [null, Validators.required],
    //   email: [null, [Validators.required, Validators.email]],
    //   password: [null, [Validators.required, Validators.minLength(8)]], 
    //   confirmPassword: [null, [Validators.required]],
    //   mobile: [null, [Validators.maxLength(10)]]
    // }, {validators: this.passwordMatchingValidator})
    this.createRegistrationForm();
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
    this.userSubmitted = true;
    if(this.registrationForm.valid){
      this.userSubmitted = true;
      this.userService.addUser(this.userData());
      this.registrationForm.reset();
      this.userSubmitted = false;
      this.alertifyService.success('Congratulations, you are successfully registered');
    } else {
      this.alertifyService.error('Kindly Resolve Errors Before Submitting');
    }
  }
  
  userData(): User{
    this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
      mobile: this.mobile.value
    }
    return this.user
  }
}
