import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm : FormGroup;
  constructor(private auth: AuthService, fb: FormBuilder){
    this.loginForm = fb.group({
      'email': "",
      'password': ""
    })
  }
  submitForm(value: any){
    this.auth.tryLogin(this.loginForm.value)
  }
}
