import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../../classes/person';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PersonService } from '../../services/person.service';
import {DomSanitizer} from '@angular/platform-browser';

import 'rxjs/Rx';

@Component({
  selector: 'person',
  templateUrl: './person.component.html',
    styleUrls: ['../people/people.component.sass']

})
export class PersonComponent implements OnInit {
  person: Person;
  constructor(private personService: PersonService,
        private router: Router,
        private sanitizer:DomSanitizer,
        private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.personService.getPerson(params.get('id'))
        .then((person: Person) => this.person = person)
        .catch((error) => console.log(error));
    });
  }

  sanitize(url:string){return this.sanitizer.bypassSecurityTrustUrl(url); }

  follow(): void {
    this.person.followed = true;
    this.personService.follow(this.person.id);
  }
  unfollow(): void {
    this.person.followed = false;
    this.personService.unfollow(this.person.id);
  }
  sendMessage(): void {
    this.router.navigate(['messages', {'sendTo': this.person.id }])
  }
}
