import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './auth.service';
import { Person } from './person';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './editprofile.component.html'
})
export class EditProfileComponent {
  @ViewChild('autoShownModal') public autoShownModal:ModalDirective;
  editProfileForm : FormGroup;
  person : Person;
  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, fb: FormBuilder){
    this.editProfileForm = fb.group({
      'email': "",
      'preferred_contact': ""
    })
    this.person = this.auth.loggedInUser()
  }
}
