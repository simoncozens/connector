import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

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
  submitForm(credentials: any){
    console.log(credentials)
    return this.auth.makeLoginAttempt(credentials)
      .then(s => this.handleLoginSuccess(s))
      .catch(e => this.handleLoginError(e));
  }

  private handleLoginSuccess(response: Response) {
    let parsed = response.json()
    console.log(parsed["token"])
    this.auth.stashJWT(parsed["token"])
  }

  private handleLoginError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
