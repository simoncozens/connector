import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule, FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { PersonService } from './person.service';
import { Person, Affiliation } from './person';
import { Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './editprofile.component.html'
})
export class EditProfileComponent implements OnInit {
    public profileForm: FormGroup;

  @ViewChild('autoShownModal') public autoShownModal: ModalDirective;
  person: Person;  public alerts: any = [];
  constructor(public personService: PersonService, private _fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.person = this.auth.loggedInUser();
  }
  ngOnInit() {
    const controls = {
          intro_bio: this.person.intro_bio,
          preferred_contact: this.person.preferred_contact,
          affiliations: this._fb.array(
            this.person.affiliations.map(a => this.initAffiliation(a))
          )
    };
    this.profileForm = this._fb.group(controls);
  }

  initAffiliation(a: Affiliation = <Affiliation>{}) {
    return this._fb.group({
        organisation: [a.organisation],
        position: [a.position],
        website: [a.website]
    });
  }

  getAffiliations(profileForm): FormArray {
    return profileForm.get('affiliations').controls;
  }

  save(form) {
    let value = form.getRawValue()
    this.personService.saveProfile(value).then(
      response => {
        this.person = Object.assign(this.person, value);
        this.auth.setLoggedInUser(this.person);
        this.alerts = [ {type: 'success', msg: `Saved successfully.` }, ]
      }
    ).catch(() => {
        this.alerts = [ {type: 'danger', msg: `Something went wrong.` }, ]
    }

    )
  }
}
